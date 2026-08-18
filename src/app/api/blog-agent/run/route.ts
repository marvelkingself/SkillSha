import { NextRequest, NextResponse } from "next/server";
import { execSync } from "child_process";
import path from "path";
import { dbConnect } from "@/lib/db";
import AgentSettings from "@/lib/models/AgentSettings";
import AgentRun from "@/lib/models/AgentRun";
import { performTopicResearch } from "@/lib/blog-agent/research";
import { generateArticle } from "@/lib/blog-agent/generator";
import { validateAndInjectLinks } from "@/lib/blog-agent/validator";
import { getImageGenerator } from "@/lib/blog-agent/image-generator";
import { blogFileManager } from "@/lib/blog-agent/file-manager";

export const dynamic = "force-dynamic";
export const maxDuration = 300; // Vercel maximum execution limit (5 minutes)

export async function POST(req: NextRequest) {
  await dbConnect();
  
  // 1. Verify Authentication / Cron Secret
  const authHeader = req.headers.get("Authorization") || req.headers.get("x-admin-secret");
  const cronSecret = process.env.CRON_SECRET || "skillsha-admin-secret-2026";
  
  if (authHeader !== `Bearer ${cronSecret}` && authHeader !== cronSecret) {
    return NextResponse.json({ success: false, error: "Unauthorized endpoint trigger" }, { status: 401 });
  }

  // 2. Initialize Agent Run Record
  const runDate = new Date().toISOString().split("T")[0];
  const activeRun = await AgentRun.create({
    date: runDate,
    status: "running",
    logs: [`[${new Date().toLocaleTimeString()}] AI Blog Agent initialized.`],
  });

  const appendLog = async (msg: string, isError = false) => {
    const time = new Date().toLocaleTimeString();
    const formatted = `[${time}] ${msg}`;
    console.log(formatted);
    
    await AgentRun.findByIdAndUpdate(activeRun._id, {
      $push: { 
        logs: formatted,
        ...(isError ? { errors: msg } : {})
      }
    });
  };

  // Run the generator loop in the background asynchronously
  runAgentAutomation(activeRun._id.toString(), appendLog).catch(async (err) => {
    await appendLog(`Critical unhandled agent failure: ${err.message || err}`, true);
    await AgentRun.findByIdAndUpdate(activeRun._id, {
      status: "failed",
      completedAt: new Date(),
    });
  });

  // Return response immediately so it doesn't block the trigger client / webhook
  return NextResponse.json({
    success: true,
    message: "Agent run started successfully in background.",
    runId: activeRun._id,
  });
}

/**
 * Background runner that executes topic selection, content drafting,
 * SEO optimization, image mapping, and project publishing.
 */
async function runAgentAutomation(runId: string, log: (msg: string, isErr?: boolean) => Promise<void>) {
  await dbConnect();
  
  let settings = await AgentSettings.findOne();
  if (!settings) {
    settings = await AgentSettings.create({});
  }

  const limit = settings.blogsPerDay || 10;
  await log(`Loaded settings: Generating ${limit} blogs targeting niche "${settings.websiteNiche}"`);

  // Step 1: Perform topic research
  let topics = [];
  try {
    topics = await performTopicResearch(settings, limit, async (msg) => {
      await log(msg);
    });
  } catch (err: any) {
    await log(`Topic research stage failed: ${err.message}`, true);
    await AgentRun.findByIdAndUpdate(runId, { status: "failed", completedAt: new Date() });
    return;
  }

  await AgentRun.findByIdAndUpdate(runId, {
    topicsSelected: topics.map((t) => t.title),
  });

  let blogsGenerated = 0;
  let blogsPublished = 0;
  let blogsFailed = 0;

  // Step 2: Loop through topics and construct articles
  for (let i = 0; i < topics.length; i++) {
    const topic = topics[i];
    await log(`--- Processing Topic #${i + 1}/${topics.length}: "${topic.title}" ---`);

    let article = null;
    let seoResult = null;
    let retryCount = 0;
    const maxRetries = 3;

    // Retry loop for SEO validation
    while (retryCount < maxRetries) {
      try {
        if (retryCount > 0) {
          await log(`SEO score was low. Regenerating article (Attempt ${retryCount + 1}/${maxRetries})...`);
        }
        
        article = await generateArticle(topic, settings, async (msg) => {
          await log(msg);
        });

        // SEO Validation and Link Insertion
        seoResult = await validateAndInjectLinks(article, async (msg) => {
          await log(msg);
        });

        if (seoResult.seoScore >= 80) {
          await log(`SEO Validation passed with score: ${seoResult.seoScore}/100.`);
          break; // SEO Audit success!
        }

        retryCount++;
      } catch (err: any) {
        await log(`Error generating/validating article: ${err.message}`, true);
        retryCount++;
      }
    }

    if (!seoResult || seoResult.seoScore < 80) {
      await log(`Topic failed SEO validation threshold of 80 after ${maxRetries} attempts. Skipping topic.`, true);
      blogsFailed++;
      await AgentRun.findByIdAndUpdate(runId, { blogsFailed });
      continue;
    }

    blogsGenerated++;
    await AgentRun.findByIdAndUpdate(runId, { blogsGenerated });

    // Step 3: Slugify and verify uniqueness
    const slug = await blogFileManager.getUniqueSlug(seoResult.updatedArticle.title);
    await log(`Assigned unique slug: "/blog/${slug}"`);

    // Step 4: Generate/Fetch Featured Image
    const publicImagePath = path.join(process.cwd(), "public", "content", "blogs", slug, "featured-image.png");
    let relativeImagePath = "";
    try {
      await log("Triggering Featured Image Generator...");
      relativeImagePath = await getImageGenerator().generateFeaturedImage(
        seoResult.updatedArticle.title,
        topic.contentType || "AI Engineering",
        publicImagePath
      );
      await log(`Featured image saved to static path: ${relativeImagePath}`);
    } catch (err: any) {
      await log(`Featured Image generation failed: ${err.message}. Falling back to default styling.`, true);
      relativeImagePath = `/content/blogs/${slug}/featured-image.png`;
    }

    // Step 5: Save JSON File & Mongoose Record
    try {
      const publishState = settings.autoPublish ? "published" : "review";
      await log(`Writing files to disk as status "${publishState}"...`);
      
      await blogFileManager.writeBlogFiles(
        slug,
        seoResult.updatedArticle,
        topic.contentType || "AI Engineering",
        seoResult.seoScore,
        publishState
      );

      if (publishState === "published") {
        blogsPublished++;
        await AgentRun.findByIdAndUpdate(runId, { blogsPublished });
      }
      
      await log(`Successfully created files for: "${topic.title}"`);
    } catch (err: any) {
      await log(`Saving files failed: ${err.message}`, true);
      blogsFailed++;
      await AgentRun.findByIdAndUpdate(runId, { blogsFailed });
    }
  }

  // Step 6: Git commit and push integration (Optional)
  const isGitPushEnabled = process.env.GIT_PUSH_ON_PUBLISH === "true" || process.env.NODE_ENV === "production";
  if (isGitPushEnabled && blogsPublished > 0) {
    try {
      await log("Git publication push enabled. Preparing repository changes...");
      execSync("git config --global user.name 'SkillSha Blog Agent'");
      execSync("git config --global user.email 'agent@skillsha.com'");
      execSync("git add content/blogs public/content/blogs");
      execSync("git commit -m 'chore(blog): auto-publish AI generated blogs [skip ci]'");
      execSync("git push origin main");
      await log("Successfully committed and pushed new blog files to Git origin. Deployment triggered!");
    } catch (err: any) {
      await log(`Git automation failed: ${err.message}. Changes are saved locally.`, true);
    }
  }

  // Finalize run
  await log(`Agent Automation Job Complete. Generated: ${blogsGenerated}, Published: ${blogsPublished}, Failed: ${blogsFailed}`);
  await AgentRun.findByIdAndUpdate(runId, {
    status: "completed",
    completedAt: new Date(),
  });
}

const fs = require("fs");
const path = require("path");

const contentBlogsDir = path.join(__dirname, "..", "content", "blogs");
const publicBlogsDir = path.join(__dirname, "..", "public", "content", "blogs");

function cleanDir(dirPath) {
  if (!fs.existsSync(dirPath)) return;
  const items = fs.readdirSync(dirPath);
  for (const item of items) {
    if (item === ".gitkeep") continue;
    const fullPath = path.join(dirPath, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      fs.rmSync(fullPath, { recursive: true, force: true });
      console.log(`Deleted folder: ${fullPath}`);
    } else {
      fs.unlinkSync(fullPath);
      console.log(`Deleted file: ${fullPath}`);
    }
  }
}

console.log("=== Cleaning up local blogs & local images ===");
cleanDir(contentBlogsDir);
cleanDir(publicBlogsDir);

const previewFile = path.join(__dirname, "..", "public", "test-blue-theme-preview.png");
if (fs.existsSync(previewFile)) {
  fs.unlinkSync(previewFile);
  console.log(`Deleted test preview file: ${previewFile}`);
}

console.log("Cleanup complete!");

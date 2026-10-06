'use client';

import { useState, useMemo } from 'react';
import {
  Mail,
  Copy,
  Check,
  Send,
  Sparkles,
  ExternalLink,
  Clock,
  FileCheck,
  Sliders,
  User,
  Building,
  Briefcase,
  HelpCircle,
} from 'lucide-react';

type Scenario = 'direct' | 'recruiter_outreach' | 'referral' | 'thank_you' | 'follow_up';
type Tone = 'high_impact' | 'polite' | 'concise';

interface ScenarioMeta {
  id: Scenario;
  name: string;
  badge: string;
  desc: string;
}

const SCENARIOS: ScenarioMeta[] = [
  {
    id: 'direct',
    name: 'Direct Job Application',
    badge: 'Most Popular',
    desc: 'Applying to an active job opening listed on careers page or LinkedIn.',
  },
  {
    id: 'recruiter_outreach',
    name: 'Cold Recruiter Outreach',
    badge: 'High Inbound',
    desc: 'Pitching your profile directly to Talent Acquisition or Engineering Managers.',
  },
  {
    id: 'referral',
    name: 'Employee Referral Request',
    badge: '3x Response Rate',
    desc: 'Asking an alumni, connection, or peer working at your dream company for a referral.',
  },
  {
    id: 'thank_you',
    name: 'Post-Interview Thank You',
    badge: 'Send within 24h',
    desc: 'Expressing gratitude, reiterating excitement, and reinforcing key interview takeaways.',
  },
  {
    id: 'follow_up',
    name: 'Application Follow-Up',
    badge: 'Send after 5-7 days',
    desc: 'Polite reminder on a pending application or post-interview feedback status.',
  },
];

export default function JobEmailGeneratorClient() {
  const [scenario, setScenario] = useState<Scenario>('direct');
  const [tone, setTone] = useState<Tone>('high_impact');

  // Input states
  const [candidateName, setCandidateName] = useState('Rahul Sharma');
  const [candidateEmail, setCandidateEmail] = useState('rahul.sharma@email.com');
  const [candidatePhone, setCandidatePhone] = useState('+91 98765 43210');
  const [candidateLinks, setCandidateLinks] = useState('linkedin.com/in/rahul-dev | github.com/rahul-dev');

  const [recipientName, setRecipientName] = useState('Pooja Verma');
  const [companyName, setCompanyName] = useState('Razorpay');
  const [targetRole, setTargetRole] = useState('Senior Frontend Engineer');
  const [yearsExperience, setYearsExperience] = useState('4 years');
  const [keySkills, setKeySkills] = useState('Next.js, React, TypeScript, Performance Optimization');
  const [keyAchievement, setKeyAchievement] = useState(
    'Architected core checkout modules that reduced page load times by 40% and handled 100k+ daily transactions.'
  );
  const [jobSourceOrId, setJobSourceOrId] = useState('LinkedIn Job ID #89201');

  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [selectedSubjectIndex, setSelectedSubjectIndex] = useState(0);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  // Generate subject lines based on scenario
  const subjectLines = useMemo(() => {
    const rName = recipientName.trim() || 'Hiring Team';
    const cName = candidateName.trim() || '[Your Name]';
    const comp = companyName.trim() || '[Company]';
    const role = targetRole.trim() || '[Target Role]';
    const exp = yearsExperience.trim() || '3+ years';

    switch (scenario) {
      case 'direct':
        return [
          `Application: ${role} - ${cName} (${exp} exp)`,
          `${cName} - Application for ${role} (${jobSourceOrId || comp})`,
          `${role} Role at ${comp} - ${cName} | Resume Attached`,
        ];
      case 'recruiter_outreach':
        return [
          `Inquiry: ${role} opportunities at ${comp} - ${cName}`,
          `${cName} - Experienced ${role} (${exp} exp) interested in ${comp}`,
          `Connecting regarding ${role} openings at ${comp} - ${cName}`,
        ];
      case 'referral':
        return [
          `Referral Request: ${role} opening at ${comp} - ${cName}`,
          `Hi ${rName} - Quick question regarding ${role} at ${comp} (${cName})`,
          `Would love your guidance / referral for ${role} @ ${comp} - ${cName}`,
        ];
      case 'thank_you':
        return [
          `Thank you for today's interview - ${role} - ${cName}`,
          `Great speaking with you, ${rName}! - ${role} follow-up - ${cName}`,
          `Thank you for the opportunity - ${role} interview discussion (${cName})`,
        ];
      case 'follow_up':
        return [
          `Following up: Application for ${role} - ${cName}`,
          `Checking in regarding ${role} interview status - ${cName}`,
          `Status update on ${role} position - ${cName}`,
        ];
      default:
        return [`Application: ${role} - ${cName}`];
    }
  }, [scenario, candidateName, companyName, targetRole, yearsExperience, jobSourceOrId, recipientName]);

  // Generate Email Body
  const emailBody = useMemo(() => {
    const greeting = recipientName.trim()
      ? `Dear ${recipientName.trim()},`
      : `Dear Hiring Team at ${companyName.trim() || 'the organization'},`;

    const cName = candidateName.trim() || '[Your Name]';
    const comp = companyName.trim() || '[Company]';
    const role = targetRole.trim() || '[Target Role]';
    const exp = yearsExperience.trim() || '[X years]';
    const ach = keyAchievement.trim() || '[Key metric-driven accomplishment]';
    const skl = keySkills.trim() || '[Core Skills]';
    const phone = candidatePhone.trim() ? `\nPhone: ${candidatePhone}` : '';
    const email = candidateEmail.trim() ? `\nEmail: ${candidateEmail}` : '';
    const links = candidateLinks.trim() ? `\nLinks: ${candidateLinks}` : '';

    const signoff =
      tone === 'concise'
        ? `Best regards,\n${cName}${phone}${email}${links}`
        : tone === 'polite'
        ? `Thank you sincerely for your time and consideration.\n\nWarm regards,\n${cName}${phone}${email}${links}`
        : `Looking forward to hearing from you.\n\nSincerely,\n${cName}${phone}${email}${links}`;

    if (scenario === 'direct') {
      if (tone === 'concise') {
        return `${greeting}

I am writing to formally apply for the ${role} position at ${comp}${jobSourceOrId ? ` (${jobSourceOrId})` : ''}.

Here is a quick snapshot of what I bring to the team:
• ${exp} of hands-on experience specializing in ${skl}.
• Proven Impact: ${ach}
• Fast executor comfortable with end-to-end product delivery, collaborative code reviews, and high standards of reliability.

I have attached my updated resume for your review. I would welcome the chance for a brief conversation to demonstrate how my background aligns with your engineering goals.

${signoff}`;
      }

      if (tone === 'polite') {
        return `${greeting}

I hope this email finds you well.

I am writing to express my enthusiastic interest in the ${role} position currently open at ${comp}. Having closely followed the impactful work ${comp} is doing in this domain, I was thrilled to find this opportunity that so closely matches my professional background.

With over ${exp} of experience focusing on ${skl}, I have delivered scalable solutions that bridge engineering precision with positive business outcomes. Most notably:
• Impact: ${ach}
• Domain Expertise: Specialized execution across ${skl} with an emphasis on production resilience, test coverage, and modular code architecture.

I have attached my comprehensive resume for your consideration. I would be grateful for the opportunity to discuss how my skill set and dedication can support ${comp}'s upcoming milestones.

${signoff}`;
      }

      // high_impact (default)
      return `${greeting}

I am excited to submit my application for the ${role} opening at ${comp}${jobSourceOrId ? ` (${jobSourceOrId})` : ''}.

With ${exp} of experience driving impact in ${skl}, I have focused my career on building robust, high-performance systems that directly move product KPIs. 

Key milestones relevant to this role:
• High-Impact Deliverables: ${ach}
• Technical Stack: Deep practical competence in ${skl}, code optimization, and cross-functional sprint delivery.
• Value Delivery: Proven ability to take ambiguous requirements, collaborate with design/product leads, and ship high-retention features on schedule.

My resume is attached for your review. I would welcome an introductory 15-minute call to discuss how I can hit the ground running with ${comp}'s team.

${signoff}`;
    }

    if (scenario === 'recruiter_outreach') {
      return `${greeting}

I hope your week is going great!

I am reaching out because I have been deeply impressed by ${comp}'s recent growth and engineering culture. As a ${role} with ${exp} of hands-on experience in ${skl}, I am exploring new opportunities where I can solve high-scale challenges.

In my recent experience, I:
• ${ach}
• Spearheaded production deployments using modern architectures with a focus on low latency and developer velocity.

I know you receive countless messages, so I'll keep this brief. If ${comp} is actively hiring or planning upcoming headcount for ${role}s, I would love to connect for 10 minutes or share my resume for future considerations.

Would you be open to a quick introductory chat this week?

${signoff}`;
    }

    if (scenario === 'referral') {
      return `Hi ${recipientName.trim() || 'there'},

I hope you're having a productive week!

I came across the ${role} opening at ${comp}${jobSourceOrId ? ` (${jobSourceOrId})` : ''} and immediately recognized it as a fantastic match for my background. Knowing your work at ${comp}, I wanted to reach out and see if you might be open to submitting an internal referral on my behalf.

To make things effortless for you, here is a quick summary of my profile:
• Target Role: ${role} ${jobSourceOrId ? `(Req ID: ${jobSourceOrId})` : ''}
• Experience: ${exp} working extensively with ${skl}
• Highlight: ${ach}
• Resume: Attached as PDF (${candidateName.replace(/\s+/g, '_')}_Resume.pdf)

I completely understand if company policy or your current schedule doesn't permit referrals right now, but I would genuinely appreciate any pointers or advice you could share.

Thank you so much for your time and support!

Best regards,
${candidateName.trim() || '[Your Name]'}${phone}${email}${links}`;
    }

    if (scenario === 'thank_you') {
      return `${greeting}

Thank you so much for taking the time to speak with me today regarding the ${role} position at ${comp}. I really enjoyed learning more about the team's vision, current technical roadmaps, and the day-to-day culture at ${comp}.

Our discussion reinforced my enthusiasm for this role. I am particularly excited about the opportunity to apply my background in ${skl} to help solve the exact scalability challenges we discussed. As mentioned during our conversation:
• ${ach}

Please let me know if you need any additional code samples, references, or documentation from my end as you progress through the decision process.

Thank you again for the engaging conversation and your consideration.

${signoff}`;
    }

    // follow_up
    return `${greeting}

I hope you are having a wonderful week.

I am writing to follow up on my application for the ${role} position at ${comp}${jobSourceOrId ? ` (${jobSourceOrId})` : ''}. 

I remain very enthusiastic about the prospect of joining ${comp} and contributing my ${exp} of experience in ${skl} toward your team's upcoming initiatives, including:
• Delivering on high-impact objectives such as: ${ach}

I understand that hiring timelines can be dynamic, so please let me know if there are any additional materials, portfolio links, or questions I can answer to assist with your evaluation.

Thank you once again for your time and guidance.

${signoff}`;
  }, [
    scenario,
    tone,
    recipientName,
    companyName,
    candidateName,
    targetRole,
    yearsExperience,
    keyAchievement,
    keySkills,
    candidatePhone,
    candidateEmail,
    candidateLinks,
    jobSourceOrId,
  ]);

  const activeSubject = subjectLines[selectedSubjectIndex] || subjectLines[0];

  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=&su=${encodeURIComponent(
    activeSubject
  )}&body=${encodeURIComponent(emailBody)}`;

  const mailtoUrl = `mailto:?subject=${encodeURIComponent(activeSubject)}&body=${encodeURIComponent(emailBody)}`;

  return (
    <div className="space-y-10">
      {/* Scenario Selector Tabs */}
      <div className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider block">Step 1</span>
            <h2 className="text-xl font-black text-slate-900">Choose Email Scenario</h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500">Tone:</span>
            <div className="inline-flex p-1 bg-slate-100 rounded-xl">
              {(
                [
                  { id: 'high_impact', label: 'High-Impact' },
                  { id: 'polite', label: 'Polite' },
                  { id: 'concise', label: 'Concise' },
                ] as const
              ).map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTone(t.id)}
                  className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                    tone === t.id
                      ? 'bg-white text-indigo-600 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {SCENARIOS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setScenario(item.id);
                setSelectedSubjectIndex(0);
              }}
              className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between gap-2 ${
                scenario === item.id
                  ? 'border-indigo-600 bg-indigo-50/50 shadow-sm ring-2 ring-indigo-600/20'
                  : 'border-slate-200 bg-slate-50/50 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <div>
                <span className="inline-block px-2 py-0.5 rounded-full bg-white text-[10px] font-bold text-indigo-600 border border-indigo-200 mb-2">
                  {item.badge}
                </span>
                <h3 className="text-xs font-bold text-slate-900 leading-snug">{item.name}</h3>
              </div>
              <p className="text-[11px] text-slate-500 line-clamp-2">{item.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Form Inputs (Left) & Live Email Output (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Input Details (5 Cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Sliders className="w-4 h-4 text-indigo-600" />
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
              Personalize Your Email
            </h3>
          </div>

          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Your Full Name</label>
                <input
                  type="text"
                  value={candidateName}
                  onChange={(e) => setCandidateName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-slate-900 font-medium focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                  placeholder="e.g. Rahul Sharma"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Recipient Name</label>
                <input
                  type="text"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-slate-900 font-medium focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                  placeholder="Pooja Verma (or leave blank)"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Target Company</label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-slate-900 font-medium focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                  placeholder="e.g. Razorpay"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Target Role</label>
                <input
                  type="text"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-slate-900 font-medium focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                  placeholder="Senior Frontend Engineer"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Years of Experience</label>
                <input
                  type="text"
                  value={yearsExperience}
                  onChange={(e) => setYearsExperience(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-slate-900 font-medium focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                  placeholder="e.g. 4 years"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Job ID / Platform</label>
                <input
                  type="text"
                  value={jobSourceOrId}
                  onChange={(e) => setJobSourceOrId(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-slate-900 font-medium focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                  placeholder="LinkedIn Job #89201"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Top Skills (Comma Separated)</label>
              <input
                type="text"
                value={keySkills}
                onChange={(e) => setKeySkills(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 text-slate-900 font-medium focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                placeholder="React, Next.js, TypeScript, REST APIs"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">
                Key Achievement / Number Metric
              </label>
              <textarea
                rows={3}
                value={keyAchievement}
                onChange={(e) => setKeyAchievement(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 text-slate-900 font-medium focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                placeholder="Reduced checkout latency by 40% and scaled platform to 100k daily orders."
              />
              <span className="text-[11px] text-slate-400">
                Tip: Mentioning a specific percentage, revenue, or metric boosts recruiter replies by 68%.
              </span>
            </div>

            <div className="pt-2 border-t border-slate-100 space-y-2">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                Contact & Links for Email Signature
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input
                  type="email"
                  value={candidateEmail}
                  onChange={(e) => setCandidateEmail(e.target.value)}
                  className="w-full p-2 rounded-lg border border-slate-200 text-slate-800 text-[11px]"
                  placeholder="your.email@example.com"
                />
                <input
                  type="tel"
                  value={candidatePhone}
                  onChange={(e) => setCandidatePhone(e.target.value)}
                  className="w-full p-2 rounded-lg border border-slate-200 text-slate-800 text-[11px]"
                  placeholder="+91 98765 43210"
                />
              </div>
              <input
                type="text"
                value={candidateLinks}
                onChange={(e) => setCandidateLinks(e.target.value)}
                className="w-full p-2 rounded-lg border border-slate-200 text-slate-800 text-[11px]"
                placeholder="linkedin.com/in/... | github.com/..."
              />
            </div>
          </div>
        </div>

        {/* Right Column: Output Email & Actions (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Subject Lines Selector */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-indigo-600" />
                <h3 className="text-sm font-bold text-slate-900">
                  Select Optimized Subject Line (High Open-Rate)
                </h3>
              </div>
            </div>

            <div className="space-y-2">
              {subjectLines.map((subj, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedSubjectIndex(idx)}
                  className={`p-3 rounded-xl border text-xs font-semibold cursor-pointer transition-all flex items-center justify-between gap-3 ${
                    selectedSubjectIndex === idx
                      ? 'border-indigo-600 bg-indigo-50/60 text-slate-900 ring-1 ring-indigo-600/30'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-slate-50/50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-4 h-4 rounded-full border flex items-center justify-center text-[10px] shrink-0 ${
                        selectedSubjectIndex === idx
                          ? 'border-indigo-600 bg-indigo-600 text-white'
                          : 'border-slate-300 bg-white text-slate-400'
                      }`}
                    >
                      {idx + 1}
                    </span>
                    <span className="truncate">{subj}</span>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopy(subj, `subj-${idx}`);
                    }}
                    className="p-1.5 rounded-lg bg-white border border-slate-200 hover:bg-indigo-50 text-slate-500 hover:text-indigo-600 shrink-0"
                    title="Copy Subject"
                  >
                    {copiedKey === `subj-${idx}` ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Formatted Email Preview */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
                  Generated Email Draft
                </span>
                <span className="text-xs text-slate-600">
                  Ready to copy, personalize, or open directly in your mail app.
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleCopy(emailBody, 'full_email')}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-sm shadow-indigo-600/20 cursor-pointer"
                >
                  {copiedKey === 'full_email' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-300" /> Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" /> Copy Email Body
                    </>
                  )}
                </button>

                <a
                  href={gmailUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5 text-red-500" /> Gmail
                </a>

                <a
                  href={mailtoUrl}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-indigo-500" /> Default Mail
                </a>
              </div>
            </div>

            {/* Email Canvas */}
            <div className="p-4 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200/80 font-mono text-xs text-slate-800 whitespace-pre-wrap leading-relaxed">
              {emailBody}
            </div>

            {/* Pro Tip Box */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
              <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200/60 flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-emerald-900 text-[11px]">Best Send Window</h4>
                  <p className="text-[11px] text-emerald-700">
                    Tue – Thu between 8:30 AM – 10:00 AM recipient local time.
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-200/60 flex items-start gap-2.5">
                <FileCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-blue-900 text-[11px]">Attachment Name</h4>
                  <p className="text-[11px] text-blue-700">
                    {candidateName.replace(/\s+/g, '_')}_Resume_{targetRole.replace(/\s+/g, '_')}.pdf
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-purple-50/70 border border-purple-200/60 flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-purple-900 text-[11px]">Follow-Up Rule</h4>
                  <p className="text-[11px] text-purple-700">
                    Wait 5 business days before sending a polite 1-touch follow-up.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

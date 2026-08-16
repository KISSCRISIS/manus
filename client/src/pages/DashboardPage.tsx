import DashboardLayout from "@/components/DashboardLayout";
import { segAssets } from "@/lib/seg-assets";
import { segDashboardPresentationProfile } from "@/lib/seg-dashboard-profile";
import React from "react";
import {
  Activity,
  ArrowUpRight,
  BookOpen,
  BrainCircuit,
  CheckCircle2,
  CircleHelp,
  ClipboardList,
  HeartPulse,
  LibraryBig,
  NotebookPen,
  ShieldAlert,
  Stethoscope,
  Target,
  Trophy,
  UserRoundCheck,
} from "lucide-react";

const learning = [
  ["Advanced Airway Management", "Paramedic pathway", "68%", Stethoscope],
  ["Cardiac Arrest Algorithms", "ACLS Module", "Next Up", HeartPulse],
  ["Trauma Assessment", "ATLS Module", "Upcoming", UserRoundCheck],
] as const;

const quickActions = [
  ["Continue Learning", BookOpen],
  ["Practice MCQs", CircleHelp],
  ["View Pathway", Target],
  ["Atlas & Visual Assets", Activity],
  ["Medical Journal", NotebookPen],
  ["Bookmarks", LibraryBig],
] as const;

const atlasVisualCategories: ReadonlyArray<{ label: string; detail?: string }> = [
  { label: "Anatomy" },
  { label: "ECG" },
  { label: "Imaging" },
  { label: "Ultrasound", detail: "Point-of-Care Ultrasound (POCUS)" },
  { label: "Critical Care" },
  { label: "Toxicology" },
] as const;

const progress = [
  ["Learning", 72, BrainCircuit],
  ["Practice", 65, Stethoscope],
  ["Mastery", 58, Target],
] as const;

const growthNodes = [
  ["BLS", "Basic Life Support", "85%", BrainCircuit, "left-[4%] top-[25%]"],
  ["ACLS", "Advanced Cardiac\nLife Support", "66%", HeartPulse, "right-[4%] top-[25%]"],
  ["ATLS", "Advanced Trauma\nLife Support", "72%", UserRoundCheck, "bottom-[15%] left-[9%]"],
  ["ASLS", "Advanced Stroke\nLife Support", "60%", Activity, "bottom-[15%] right-[9%]"],
] as const;

const activity = [
  ["Completed: ECG Interpretation", "2 hours ago", "complete"],
  ["Quiz: ACLS Post Test", "5 hours ago", "score"],
  ["Studied: Sepsis Management", "1 day ago", "complete"],
  ["Bookmarked: Hyperkalemia", "2 days ago", "bookmark"],
] as const;

const records = [
  ["BLS Provider", "American Heart Association", "Valid"],
  ["ACLS Provider", "American Heart Association", "Valid"],
  ["ATLS Provider", "American College of Surgeons", "In Progress"],
] as const;

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
  icon: typeof BookOpen;
  titleId?: string;
};

function SectionHeader({ eyebrow, title, description, icon: Icon, titleId }: SectionHeaderProps) {
  return (
    <div className="flex min-w-0 items-start gap-3">
      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-cyan-200/20 bg-cyan-300/[.08] text-cyan-200 shadow-[0_0_20px_rgba(0,212,255,.08)]">
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0">
        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-cyan-200">{eyebrow}</p>
        <h2 id={titleId} className="mt-1 text-xl font-bold tracking-[-0.035em] text-white sm:text-2xl">{title}</h2>
        <p className="mt-1 max-w-2xl text-xs leading-5 text-slate-400">{description}</p>
      </div>
    </div>
  );
}

function SectionStageAsset({ src, className, name }: { src: string; className: string; name: string }) {
  return <img src={src} alt="" aria-hidden="true" data-seg-shared-asset={name} className={className} />;
}

function ProgressList({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "space-y-3" : "space-y-4"}>
      {progress.map(([label, value, Icon]) => (
        <div key={label}>
          <div className="flex items-center gap-2">
            <Icon className="h-3.5 w-3.5 shrink-0 text-cyan-300" />
            <div className="flex flex-1 items-center justify-between gap-3 text-[11px]">
              <span className="text-slate-300">{label}</span>
              <span className="font-semibold text-cyan-200">{value}%</span>
            </div>
          </div>
          <div className="mt-1.5 h-1 rounded-full bg-white/10">
            <div className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-blue-500" style={{ width: `${value}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function WorkspaceMetric({ label, value, icon: Icon }: { label: string; value: string; icon: typeof BookOpen }) {
  return (
    <article className="seg-workspace-metric">
      <Icon className="h-4 w-4 text-cyan-200" />
      <p className="mt-3 text-base font-bold text-white">{value}</p>
      <p className="mt-0.5 text-[10px] text-slate-400">{label}</p>
    </article>
  );
}

function ProgressCard() {
  return (
    <section className="seg-reference-card seg-dashboard-card rounded-xl p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-white">My Progress Overview</h2>
        <span className="text-[10px] text-slate-400">This Month⌄</span>
      </div>
      <div className="mt-6 flex items-center gap-4">
        <div className="seg-progress-ring"><span className="text-lg font-bold text-white">68%</span></div>
        <div>
          <p className="text-sm font-semibold text-white">Overall Progress</p>
          <p className="mt-1 text-[11px] text-slate-400">Great! Keep going</p>
        </div>
      </div>
      <div className="mt-6"><ProgressList /></div>
    </section>
  );
}

function GrowthCore() {
  return (
    <section className="seg-dashboard-core seg-dashboard-card relative min-h-[418px] overflow-hidden rounded-xl p-4">
      <p className="relative z-10 text-center text-xs font-semibold uppercase tracking-[0.1em] text-white">Professional Growth Core</p>
      <div className="seg-dashboard-core-stage" aria-hidden="true">
        <div className="seg-core-aura" />
        <div className="seg-core-blend-field" />
        <img src={segAssets.dashboardBrainHeartCoreClean} alt="" className="seg-core-dashboard-brain-heart seg-core-artifact-mask" />
        <div className="seg-core-ring seg-core-ring-one" />
        <div className="seg-core-ring seg-core-ring-two" />
      </div>
      {growthNodes.map(([title, subtitle, value, Icon, position]) => (
        <div key={title} className={`seg-growth-node absolute ${position}`}>
          <Icon className="mx-auto h-6 w-6 text-cyan-300" />
          <p className="mt-1 text-xs font-bold text-white">{title}</p>
          <p className="mt-0.5 whitespace-pre-line text-[9px] leading-3 text-slate-300">{subtitle}</p>
          <div className="mx-auto mt-2 h-0.5 w-12 bg-white/10"><div className="h-full bg-cyan-300" style={{ width: value }} /></div>
          <p className="mt-1 text-[10px] font-bold text-white">{value}</p>
        </div>
      ))}
      <div className="seg-growth-node seg-growth-other absolute bottom-[-4px] left-1/2 -translate-x-1/2">
        <Trophy className="mx-auto h-6 w-6 text-cyan-300" />
        <p className="mt-1 text-xs font-bold text-white">OTHER COURSES</p>
        <p className="mt-0.5 text-[9px] text-slate-300">Specialized Medical Courses<br />&amp; Certifications</p>
        <div className="mx-auto mt-2 h-0.5 w-14 bg-white/10"><div className="h-full w-[45%] bg-cyan-300" /></div>
        <p className="mt-1 text-[10px] font-bold text-white">45%</p>
      </div>
    </section>
  );
}

function ActivityRows({ limit = activity.length }: { limit?: number }) {
  return (
    <div className="space-y-3">
      {activity.slice(0, limit).map(([title, time, kind]) => (
        <div key={title} className="flex gap-3 rounded-lg border border-white/[.045] bg-white/[.018] p-2.5">
          <div className="mt-0.5 shrink-0 text-cyan-300">
            {kind === "score" ? <span className="grid h-4 w-4 place-items-center rounded-full border border-cyan-300 text-[7px] font-bold">82</span> : kind === "bookmark" ? <LibraryBig className="h-4 w-4" /> : <CheckCircle2 className="h-4 w-4" />}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs text-slate-100">{title}</p>
            <p className="mt-0.5 text-[10px] text-slate-500">{time}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function ActivityCard() {
  return (
    <section className="seg-reference-card seg-dashboard-card rounded-xl p-4">
      <div className="flex justify-between"><h2 className="text-sm font-semibold text-white">Recent Activity</h2><button className="text-[10px] font-bold text-cyan-200">View All</button></div>
      <div className="mt-4"><ActivityRows /></div>
    </section>
  );
}

function PathwaySection() {
  return (
    <section id="pathway" className="seg-internal-section scroll-mt-20" aria-labelledby="pathway-title">
      <div data-seg-layout="pathway-workspace" className="seg-internal-stage seg-workspace-shell rounded-2xl p-4 sm:p-5">
        <SectionStageAsset src={segAssets.primaryLogo} name="primary-logo" className="seg-section-stage-asset seg-section-asset-brand" />
        <SectionHeader eyebrow="MY PATHWAY" title="My Learning Pathway" description="Track your current learning plan and progress within the existing SEG workspace." icon={Target} />
        <section className="seg-pathway-hero mt-5 rounded-xl p-4 sm:p-5" aria-label="Learning pathway overview">
          <div className="max-w-xl">
            <p className="text-[10px] font-bold uppercase tracking-[.14em] text-cyan-200">JOURNEY OVERVIEW</p>
            <h3 className="mt-2 text-lg font-bold tracking-[-.03em] text-white sm:text-xl">Build your professional learning route</h3>
            <p className="mt-2 text-xs leading-5 text-slate-300">Follow the current learning steps and milestones already shown in your My Home workspace.</p>
            <a href="#learn" className="seg-button-secondary mt-4 inline-flex text-xs">Explore learning modules <ArrowUpRight className="h-3.5 w-3.5" /></a>
          </div>
          <div className="mt-5 grid grid-cols-3 gap-2 sm:max-w-xl sm:gap-3">
            {learning.map(([title, subtitle, status, Icon], index) => (
              <div key={title} className="rounded-lg border border-cyan-200/[.12] bg-[#07111e]/60 p-2.5 sm:p-3">
                <div className="flex items-center justify-between"><Icon className="h-4 w-4 text-cyan-200" /><span className="text-[10px] text-slate-500">0{index + 1}</span></div>
                <p className="mt-3 truncate text-xs font-semibold text-white">{title}</p>
                <p className="mt-1 text-[10px] font-bold text-cyan-200">{status}</p>
              </div>
            ))}
          </div>
        </section>
        <div className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1.55fr)_minmax(17rem,.7fr)]">
          <section className="seg-reference-card rounded-xl p-4 sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-3"><h3 id="pathway-title" className="text-base font-semibold text-white">Your Learning Path</h3><button className="seg-inline-control">Current modules <ArrowUpRight className="h-3.5 w-3.5" /></button></div>
            <div className="relative mt-5 space-y-3 before:absolute before:bottom-6 before:left-[1.35rem] before:top-6 before:w-px before:bg-gradient-to-b before:from-cyan-300/80 before:via-cyan-300/30 before:to-transparent">
              {learning.map(([title, subtitle, status, Icon], index) => (
                <article key={title} className="relative ml-1 flex items-center gap-3 rounded-xl border border-cyan-200/[.12] bg-[#07111e]/75 p-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,.025)]">
                  <div className="relative z-10 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-cyan-200/25 bg-[#0b1726] text-cyan-200"><Icon className="h-4 w-4" /></div>
                  <div className="min-w-0 flex-1"><p className="text-sm font-semibold text-white">{title}</p><p className="mt-0.5 text-[11px] text-slate-400">{subtitle}</p></div>
                  <div className="text-right"><p className="text-xs font-bold text-cyan-200">{status}</p><p className="mt-1 text-[10px] text-slate-500">Step {index + 1}</p></div>
                </article>
              ))}
            </div>
          </section>
          <aside className="space-y-4">
            <section className="seg-glass-card rounded-xl p-4"><div className="flex items-center justify-between"><h3 className="text-sm font-semibold text-white">Pathway Progress</h3><span className="text-[10px] text-slate-400">Current</span></div><div className="mt-5"><ProgressList compact /></div></section>
            <section className="seg-reference-card rounded-xl p-4"><div className="flex items-start justify-between gap-3"><div><p className="text-[10px] font-bold uppercase tracking-[.12em] text-cyan-200">NEXT MILESTONE</p><p className="mt-2 text-sm font-semibold text-white">Continue your current pathway</p></div><Trophy className="h-5 w-5 text-cyan-200" /></div><p className="mt-1 text-[11px] leading-5 text-slate-400">Use your existing module activity to continue where you left off.</p><a href="#learn" className="seg-button-secondary mt-4 w-full text-xs">View learning modules <ArrowUpRight className="h-3.5 w-3.5" /></a></section>
          </aside>
        </div>
      </div>
    </section>
  );
}

function LearnSection() {
  return (
    <section id="learn" className="seg-internal-section scroll-mt-20" aria-labelledby="learn-title">
      <div data-seg-layout="learn-workspace" className="seg-internal-stage seg-workspace-shell rounded-2xl p-4 sm:p-5">
        <SectionStageAsset src={segAssets.heroLogo} name="hero-logo" className="seg-section-stage-asset seg-section-asset-hero" />
        <SectionHeader eyebrow="LEARN" title="Learn" description="Continue from the learning modules and progress records already available in My Home." icon={BookOpen} />
        <section className="seg-learn-hero mt-5 rounded-xl p-4 sm:p-5" aria-label="Learning workspace overview">
          <div className="max-w-xl">
            <p className="text-[10px] font-bold uppercase tracking-[.14em] text-cyan-200">LEARNING WORKSPACE</p>
            <h3 className="mt-2 text-lg font-bold tracking-[-.03em] text-white sm:text-xl">Continue your learning journey</h3>
            <p className="mt-2 text-xs leading-5 text-slate-300">Resume the modules and progress already available in your My Home workspace.</p>
            <a href="#pathway" className="seg-button-secondary mt-4 inline-flex text-xs">View learning pathway <ArrowUpRight className="h-3.5 w-3.5" /></a>
          </div>
          <div className="seg-workspace-metrics mt-5 grid grid-cols-3 gap-2 sm:max-w-xl sm:gap-3">
            {progress.map(([label, value, Icon]) => (
              <WorkspaceMetric key={label} label={label} value={`${value}%`} icon={Icon} />
            ))}
          </div>
        </section>
        <div className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1.55fr)_minmax(17rem,.7fr)]">
          <section className="seg-reference-card rounded-xl p-4 sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-3"><h3 id="learn-title" className="text-base font-semibold text-white">Explore Learning Modules</h3><button className="seg-inline-control">Your modules <ArrowUpRight className="h-3.5 w-3.5" /></button></div>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {learning.map(([title, subtitle, status, Icon]) => (
                <article key={title} className="seg-glass-interactive rounded-xl border border-cyan-200/[.12] bg-[#07111e]/80 p-4">
                  <div className="flex items-start justify-between gap-3"><div className="grid h-10 w-10 place-items-center rounded-xl border border-cyan-200/20 bg-cyan-300/[.08] text-cyan-200"><Icon className="h-5 w-5" /></div><ArrowUpRight className="h-4 w-4 text-cyan-200" /></div>
                  <h4 className="mt-6 text-sm font-semibold leading-5 text-white">{title}</h4><p className="mt-1 text-[11px] text-slate-400">{subtitle}</p><div className="mt-5 flex items-center justify-between border-t border-white/[.07] pt-3"><span className="text-[10px] font-bold text-cyan-200">{status}</span><span className="text-[10px] text-slate-500">Continue</span></div>
                </article>
              ))}
            </div>
          </section>
          <aside className="space-y-4">
            <section className="seg-reference-card rounded-xl p-4"><div className="flex items-center justify-between"><h3 className="text-sm font-semibold text-white">Learning Overview</h3><span className="text-[10px] text-slate-400">Current</span></div><div className="mt-5"><ProgressList compact /></div></section>
            <section className="seg-reference-card rounded-xl p-4"><div className="flex items-center justify-between"><h3 className="text-sm font-semibold text-white">Continue Learning</h3><button className="text-[10px] font-bold text-cyan-200">View All</button></div><div className="mt-4 space-y-3">{learning.slice(0, 2).map(([title, subtitle, status, Icon]) => <div key={title} className="flex items-center gap-3"><Icon className="h-4 w-4 shrink-0 text-cyan-300" /><div className="min-w-0 flex-1"><p className="truncate text-xs font-semibold text-white">{title}</p><p className="text-[10px] text-slate-500">{subtitle}</p></div><span className="text-[10px] font-bold text-cyan-200">{status}</span></div>)}</div></section>
          </aside>
        </div>
      </div>
    </section>
  );
}

function PracticeSection() {
  return (
    <section id="practice" className="seg-internal-section scroll-mt-20" aria-labelledby="practice-title">
      <div data-seg-layout="practice-workspace" className="seg-internal-stage seg-workspace-shell rounded-2xl p-4 sm:p-5">
        <SectionStageAsset src={segAssets.anatomyHologram} name="anatomy-hologram" className="seg-section-stage-asset seg-section-asset-anatomy" />
        <SectionHeader eyebrow="PRACTICE" title="Practice" description="Return to the existing practice tools and review the activity already shown in My Home." icon={ClipboardList} />
        <section className="seg-practice-hero mt-5 rounded-xl p-4 sm:p-5" aria-label="Practice workspace overview">
          <div className="max-w-xl">
            <p className="text-[10px] font-bold uppercase tracking-[.14em] text-cyan-200">PRACTICE WORKSPACE</p>
            <h3 className="mt-2 text-lg font-bold tracking-[-.03em] text-white sm:text-xl">Build confidence with your current tools</h3>
            <p className="mt-2 text-xs leading-5 text-slate-300">Use the established practice modes and activity records already available in your My Home workspace.</p>
            <a href="#learn" className="seg-button-secondary mt-4 inline-flex text-xs">Return to learning <ArrowUpRight className="h-3.5 w-3.5" /></a>
          </div>
          <div className="seg-workspace-metrics mt-5 grid grid-cols-3 gap-2 sm:max-w-xl sm:gap-3">
            {progress.map(([label, value, Icon]) => (
              <WorkspaceMetric key={label} label={label} value={`${value}%`} icon={Icon} />
            ))}
          </div>
        </section>
        <div className="seg-workspace-grid mt-4 grid gap-4 xl:grid-cols-[minmax(0,1.55fr)_minmax(17rem,.7fr)]">
          <section className="seg-reference-card seg-workspace-card rounded-xl p-4 sm:p-5"><div className="flex flex-wrap items-center justify-between gap-3"><div><h3 id="practice-title" className="text-base font-semibold text-white">Practice Modes</h3><p className="mt-1 text-[11px] text-slate-400">Available tools from your existing workspace</p></div><span className="seg-inline-control">Available tools <ArrowUpRight className="h-3.5 w-3.5" /></span></div><div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">{quickActions.map(([label, Icon]) => <button key={label} type="button" className="seg-dashboard-action seg-workspace-action seg-glass-interactive rounded-xl border border-cyan-200/[.12] bg-[#07111e]/80 p-4 text-left"><Icon className="h-6 w-6 text-cyan-300" /><p className="mt-5 text-xs font-semibold text-slate-100">{label}</p><span className="mt-1 flex items-center gap-1 text-[10px] font-semibold text-cyan-200">Open <ArrowUpRight className="h-3 w-3" /></span></button>)}</div></section>
          <aside className="seg-workspace-rail space-y-4"><section className="seg-reference-card seg-workspace-sidecard rounded-xl p-4"><div className="flex items-center justify-between"><h3 className="text-sm font-semibold text-white">Practice Performance</h3><span className="text-[10px] text-slate-400">Current</span></div><div className="mt-5"><ProgressList compact /></div></section><section className="seg-reference-card seg-workspace-sidecard rounded-xl p-4"><div className="flex items-center justify-between"><h3 className="text-sm font-semibold text-white">Practice Activity</h3><button className="text-[10px] font-bold text-cyan-200">View All</button></div><div className="mt-4"><ActivityRows limit={3} /></div></section></aside>
        </div>
      </div>
    </section>
  );
}

function JournalSection() {
  return (
    <section id="journal" className="seg-internal-section scroll-mt-20" aria-labelledby="journal-title">
      <div data-seg-layout="journal-workspace" className="seg-internal-stage seg-workspace-shell rounded-2xl p-4 sm:p-5">
        <SectionStageAsset src={segAssets.brainHeartCore} name="brain-heart-core" className="seg-section-stage-asset seg-section-asset-core" />
        <SectionHeader eyebrow="MEDICAL JOURNAL" title="Medical Journal" description="A structured visual foundation for your existing professional records and learning activity." icon={NotebookPen} />
        <section className="seg-journal-hero mt-5 rounded-xl p-4 sm:p-5" aria-label="Medical Journal workspace overview">
          <div className="max-w-xl">
            <p className="text-[10px] font-bold uppercase tracking-[.14em] text-cyan-200">JOURNAL WORKSPACE</p>
            <h3 className="mt-2 text-lg font-bold tracking-[-.03em] text-white sm:text-xl">Organize approved professional knowledge</h3>
            <p className="mt-2 text-xs leading-5 text-slate-300">This workspace presents existing professional records and learning activity. Journal articles require an approved source, version, review status, and audit trail before display.</p>
          </div>
          <div className="mt-5 grid gap-2 sm:max-w-xl sm:grid-cols-[minmax(0,1fr)_auto]">
            <label className="flex min-h-10 items-center rounded-lg border border-cyan-200/[.12] bg-[#07111e]/60 px-3">
              <span className="sr-only">Search approved journal entries</span>
              <input aria-label="Search approved journal entries" disabled placeholder="Search requires approved journal entries" className="w-full bg-transparent text-xs text-slate-300 outline-none placeholder:text-slate-500 disabled:cursor-not-allowed" />
            </label>
            <span className="seg-inline-control justify-center text-[10px]">Approved content only</span>
          </div>
          <div className="mt-3 flex flex-wrap gap-2" aria-label="Journal categories">
            {['Professional Records', 'Learning Activity', 'Saved Knowledge'].map((category) => <span key={category} className="rounded-full border border-cyan-200/[.12] bg-[#07111e]/60 px-3 py-1.5 text-[10px] font-semibold text-cyan-100">{category}</span>)}
          </div>
        </section>
        <div className="seg-workspace-grid mt-4 grid gap-4 xl:grid-cols-[minmax(0,1.35fr)_minmax(15rem,.75fr)_minmax(15rem,.75fr)]">
          <section className="seg-reference-card seg-workspace-card rounded-xl p-4 sm:p-5"><div className="flex items-center justify-between"><h3 id="journal-title" className="text-base font-semibold text-white">Professional Records</h3><button className="seg-inline-control">View all <ArrowUpRight className="h-3.5 w-3.5" /></button></div><div className="mt-5 space-y-3">{records.map(([name, issuer, status]) => <article key={name} className="flex items-center gap-3 rounded-xl border border-white/[.06] bg-[#07111e]/70 p-3.5"><div className="grid h-9 w-9 place-items-center rounded-lg border border-cyan-200/15 bg-cyan-300/[.07] text-cyan-200"><NotebookPen className="h-4 w-4" /></div><div className="min-w-0 flex-1"><p className="text-sm font-semibold text-white">{name}</p><p className="mt-0.5 truncate text-[11px] text-slate-400">{issuer}</p></div><span className={status === "Valid" ? "text-[10px] font-bold text-emerald-300" : "text-[10px] font-bold text-cyan-200"}>{status}</span></article>)}</div></section>
          <section className="seg-reference-card seg-workspace-sidecard rounded-xl p-4"><div className="flex items-center justify-between"><h3 className="text-sm font-semibold text-white">Recent Learning Activity</h3><Activity className="h-4 w-4 text-cyan-200" /></div><div className="mt-4"><ActivityRows limit={3} /></div></section>
          <section className="seg-reference-card seg-journal-empty rounded-xl p-4"><div className="flex items-center justify-between"><h3 className="text-sm font-semibold text-white">Reading Interface</h3><LibraryBig className="h-4 w-4 text-cyan-200" /></div><p className="mt-3 text-[11px] leading-5 text-slate-400">No approved journal article is available for display. An approved item must include source, version, review status, and audit trail before it can open here.</p><div className="mt-5 border-t border-white/[.07] pt-4"><a href="#account" className="seg-button-secondary w-full text-xs">View professional records <ArrowUpRight className="h-3.5 w-3.5" /></a></div></section>
        </div>
      </div>
    </section>
  );
}

function AtlasSection() {
  return (
    <section id="reference" aria-labelledby="atlas-visual-assets-title" className="seg-internal-section scroll-mt-20">
      <div data-seg-layout="atlas-internal-stage" className="seg-internal-stage seg-workspace-shell rounded-2xl p-5 sm:p-6">
        <img src={segAssets.atlasVisualAssetsHero} alt="" aria-hidden="true" data-seg-approved-asset="atlas-visual-assets-hero" className="seg-section-stage-asset seg-section-asset-atlas" />
        <SectionHeader eyebrow="SEG MEDICAL KNOWLEDGE ATLAS" title="Atlas & Visual Assets" description="A dedicated visual workspace within the existing SEG Dashboard. Medical content integration remains outside this phase." icon={LibraryBig} titleId="atlas-visual-assets-title" />
        <section className="seg-atlas-hero mt-6 rounded-xl">
          <div className="max-w-3xl p-5 sm:p-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-cyan-200">Visual Workspace</p>
            <h3 className="mt-2 text-xl font-bold tracking-[-0.035em] text-white sm:text-2xl">Explore visual learning domains</h3>
            <p className="mt-2 max-w-2xl text-xs leading-5 text-slate-300">The approved information architecture is ready for future reviewed material. This visual alignment does not add medical data or clinical content.</p>
            <nav className="seg-atlas-navigation" aria-label="Atlas visual navigation">
              {atlasVisualCategories.map(({ label }) => <a key={label} href="#reference">{label}<ArrowUpRight className="h-3 w-3" /></a>)}
            </nav>
            <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-3" aria-label="Atlas and Visual Assets information architecture">
              {atlasVisualCategories.map(({ label, detail }) => (
                <div key={label} className="min-h-16 rounded-lg border border-cyan-200/[.13] bg-[#07111e]/80 px-3 py-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,.025)] backdrop-blur-sm">
                  <p className="text-xs font-semibold text-slate-100">{label}</p>
                  {detail ? <p className="mt-1 text-[10px] leading-3.5 text-cyan-200">{detail}</p> : null}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}

function HomeDashboard() {
  return (
    <div className="grid gap-4 xl:grid-cols-12">
      <div className="space-y-4 xl:col-span-3"><ProgressCard /><section className="seg-reference-card seg-dashboard-card rounded-xl p-4"><div className="flex items-center justify-between"><h2 className="text-sm font-semibold text-white">Knowledge Mastery</h2><button className="text-[10px] font-bold text-cyan-200">View All</button></div><div className="seg-mastery-radar mt-5"><div className="seg-mastery-diamond"><Target className="h-9 w-9 -rotate-45 text-cyan-300" /></div><span className="top-1/2 -left-1 -translate-y-1/2">Emergency<br />Care</span><span className="top-1/2 -right-1 -translate-y-1/2">Trauma</span><span className="left-1/2 top-0 -translate-x-1/2">Cardiology</span><span className="bottom-0 left-1/2 -translate-x-1/2">Neurology</span></div></section></div>
      <div className="xl:col-span-5"><GrowthCore /></div>
      <div className="space-y-4 xl:col-span-4"><section className="seg-reference-card seg-dashboard-card rounded-xl p-4"><div className="flex items-center justify-between"><h2 className="text-sm font-semibold text-white">Upcoming Learning</h2><button className="text-[11px] font-bold text-cyan-200">View All</button></div><div className="mt-4 space-y-3">{learning.map(([title, subtitle, status, Icon]) => <div key={title} className="flex items-center gap-3"><div className="grid h-8 w-8 place-items-center rounded-lg border border-cyan-200/15 bg-cyan-300/[.07]"><Icon className="h-4 w-4 text-cyan-300" /></div><div className="min-w-0 flex-1"><p className="truncate text-xs font-semibold text-white">{title}</p><p className="text-[10px] text-slate-400">{subtitle}</p></div><span className="text-[10px] font-bold text-cyan-200">{status}</span></div>)}</div></section><ActivityCard /></div>
      <section className="seg-reference-card seg-dashboard-card rounded-xl p-4 xl:col-span-7"><div><h2 className="text-sm font-semibold text-white">Quick Actions</h2><p className="mt-1 text-[10px] text-slate-500">Focus more to improve your mastery</p></div><div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">{quickActions.map(([label, Icon]) => <button key={label} className="seg-dashboard-action seg-glass-interactive rounded-lg border border-white/10 bg-[#07111e]/80 p-3 text-center"><Icon className="mx-auto h-6 w-6 text-cyan-300" /><p className="mt-2 text-[10px] font-semibold text-slate-100">{label}</p></button>)}</div></section>
      <section className="seg-reference-card seg-dashboard-card rounded-xl p-4 xl:col-span-3"><div className="flex justify-between"><h2 className="text-sm font-semibold text-white">Weak Areas</h2><button className="text-[10px] font-bold text-cyan-200">View All</button></div><p className="mt-1 text-[10px] text-slate-500">Focus more to improve your mastery</p><div className="mt-4 space-y-3">{[["Pharmacology", 45], ["Neurology", 48], ["Trauma", 55]].map(([label, value]) => <div key={label}><div className="flex justify-between text-[10px]"><span className="text-slate-300">{label}</span><span className="text-slate-400">{value}%</span></div><div className="mt-1 h-1 rounded-full bg-white/10"><div className="h-full rounded-full bg-gradient-to-r from-red-400 to-amber-300" style={{ width: `${value}%` }} /></div></div>)}</div></section>
      <section className="seg-reference-card seg-dashboard-card rounded-xl p-4 xl:col-span-4"><div className="flex justify-between"><h2 className="text-sm font-semibold text-white">Practice Performance</h2><span className="text-[10px] text-slate-400">This Month⌄</span></div><div className="mt-5 grid grid-cols-3 divide-x divide-white/10 text-center"><div><p className="text-[10px] text-slate-400">Questions Solved</p><p className="mt-2 text-2xl font-bold text-white">245</p></div><div><p className="text-[10px] text-slate-400">Avg. Score</p><p className="mt-2 text-2xl font-bold text-cyan-200">72%</p></div><div><p className="text-[10px] text-slate-400">Top Score</p><p className="mt-2 text-2xl font-bold text-white">92%</p></div></div></section>
      <section className="seg-reference-card seg-dashboard-card rounded-xl p-4 xl:col-span-5"><div className="flex justify-between"><h2 className="text-sm font-semibold text-white">Certificates</h2><button className="text-[10px] font-bold text-cyan-200">View All</button></div><div className="mt-4 space-y-2 text-xs">{records.map(([name, issuer, status]) => <div key={name} className="flex items-center justify-between rounded-lg bg-white/[.025] px-2 py-1.5"><div><p className="font-semibold text-slate-200">{name}</p><p className="mt-0.5 text-[9px] text-slate-500">{issuer}</p></div><span className={status === "Valid" ? "text-[10px] font-bold text-emerald-300" : "text-[10px] font-bold text-cyan-200"}>{status}</span></div>)}</div></section>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="mx-auto max-w-[1410px]">
        <section className="seg-dashboard-greeting mb-5 grid gap-4 xl:grid-cols-[minmax(220px,1fr)_minmax(260px,1.35fr)_minmax(245px,1fr)] xl:items-center">
          <div><p className="text-xs text-slate-400">Welcome back,</p><h1 className="mt-1 text-3xl font-bold tracking-[-0.045em] text-white">{segDashboardPresentationProfile.displayName}</h1><p className="mt-1 text-sm text-slate-300">Ready to save lives today</p></div>
          <div className="relative"><div className="seg-dashboard-ecg absolute inset-x-0 top-1/2 hidden xl:block" aria-hidden="true" /><button className="relative z-10 mx-auto flex min-h-14 items-center justify-center gap-3 rounded-lg border border-red-300/45 bg-gradient-to-r from-red-700/90 to-red-500/80 px-7 text-sm font-bold text-white shadow-[0_0_30px_rgba(239,68,68,0.28)]"><ShieldAlert className="h-6 w-6" /><span><span className="block">EMERGENCY ACTION</span><span className="text-[10px] font-medium text-red-100">Quick Access</span></span></button></div>
          <section className="seg-reference-card seg-dashboard-role rounded-xl px-4 py-3"><div className="flex items-center justify-between gap-3"><div><p className="text-[10px] text-slate-400">Your Role</p><p className="mt-1 text-sm font-bold text-white">Emergency Medicine Physician</p><button className="mt-2 text-[10px] font-bold text-cyan-200">View Profile</button></div><div className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-cyan-200/25 bg-cyan-300/10 text-cyan-200"><ShieldAlert className="h-5 w-5" /></div></div></section>
        </section>
        <HomeDashboard />
        <div className="mt-10 space-y-6 sm:mt-12">
          <PathwaySection />
          <LearnSection />
          <PracticeSection />
          <AtlasSection />
          <JournalSection />
        </div>
      </div>
    </DashboardLayout>
  );
}

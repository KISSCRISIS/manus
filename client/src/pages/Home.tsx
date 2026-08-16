import { SEG_PUBLIC_ACTIONS } from "@/lib/seg-copy";
import { segAssets } from "@/lib/seg-assets";
import { SEG_ROUTES } from "@/lib/seg-navigation";
import { ThemeToggle } from "@/components/ThemeToggle";
import React from "react";
import {
  Activity,
  ArrowRight,
  Bell,
  BookOpen,
  BrainCircuit,
  BriefcaseMedical,
  ChartNoAxesCombined,
  ChevronRight,
  ClipboardList,
  Crosshair,
  GraduationCap,
  HeartPulse,
  House,
  Mail,
  NotebookPen,
  Settings,
  ShieldCheck,
  Siren,
  Sparkles,
  Stethoscope,
  Target,
  UserRound,
  UsersRound,
} from "lucide-react";
import { Link } from "wouter";

const navigation = [
  { label: "My Home", icon: House, href: "#top" },
  { label: "My Pathway", icon: BrainCircuit, href: "#capabilities" },
  { label: "Learn", icon: BookOpen, href: "#capabilities" },
  { label: "Practice", icon: Crosshair, href: "#capabilities" },
  { label: "Atlas & Visual Assets", icon: ClipboardList, href: "#capabilities", current: true },
  { label: "Medical Journal", icon: BookOpen, href: "#capabilities" },
  { label: "My Account", icon: UserRound, href: "#trust" },
];

const benefits = [
  { title: "AI-Powered", detail: "Adaptive to your needs", icon: BrainCircuit },
  { title: "Evidence-Based", detail: "Trusted resources", icon: ShieldCheck },
  { title: "Track & Improve", detail: "Monitor your progress", icon: ChartNoAxesCombined },
];

const metrics = [
  { value: "50+", label: "Medical Specialties", icon: HeartPulse },
  { value: "1,000+", label: "Learning Modules", icon: BookOpen },
  { value: "10,000+", label: "Practice Questions", icon: BrainCircuit },
  { value: "5,000+", label: "Clinical Cases", icon: BriefcaseMedical },
  { value: "12K+", label: "Active Professionals", icon: UsersRound },
];

const capabilities = [
  { title: "Emergency Access", body: "Quick life-saving tools for critical moments", icon: Siren, kind: "emergency" },
  { title: "Smart References & Tools", body: "Curated support for confident learning and clinical development.", details: ["Evidence-Based Resources", "Medical References", "Clinical Tools", "Learning Support"], icon: ClipboardList, kind: "references" },
  { title: "Clinical Tools", body: "ECG · POCUS · Calculators & more", icon: Activity, kind: "tools" },
  { title: "Practice", body: "Real-world clinical scenarios and quizzes", icon: Stethoscope, kind: "practice" },
  { title: "Learn", body: "Medical modules and continuous education", icon: BookOpen, kind: "learn" },
  { title: "Medical Journal", body: "Your clinical notes and learning journey", icon: NotebookPen, kind: "journal" },
];

const trustValues = [
  { title: "Trusted by Professionals Worldwide", icon: ShieldCheck },
  { title: "Up-to-date & Reliable", icon: ShieldCheck },
  { title: "Secure & Private", icon: ClipboardList },
  { title: "Available 24/7", icon: Crosshair },
  { title: "Built by Experts for Experts", icon: GraduationCap },
  { title: "Focused on Better Outcomes", icon: HeartPulse },
];

export default function Home() {
  return (
    <div id="top" className="seg-landing-v4">
      <header className="seg-landing-v4-header">
        <Link href={SEG_ROUTES.landing} className="seg-landing-v4-brand" aria-label="SEG home">
          <img src={segAssets.landingOfficialLockup} alt="SEG Smart Emergency Guide" />
        </Link>

        <nav className="seg-landing-v4-nav" aria-label="Primary navigation">
          {navigation.map(({ label, icon: Icon, href, current }) => (
            <a key={label} href={href} aria-label={label} className={`seg-landing-v4-nav-item${current ? " is-active" : ""}`} aria-current={current ? "page" : undefined}>
              <Icon aria-hidden="true" />
              <span>{label}</span>
            </a>
          ))}
        </nav>

        <div className="seg-landing-v4-profile">
          <img src={segAssets.landingProfileThumbnail} alt="" aria-hidden="true" />
          <div className="seg-landing-v4-profile-copy"><strong>Dr. Ahmed Ali</strong><span>Emergency Medicine Resident</span><em><i aria-hidden="true" />Online</em></div>
          <ThemeToggle />
          <button type="button" className="seg-landing-v4-utility" aria-label="Notifications"><Bell aria-hidden="true" /><b>4</b></button>
          <button type="button" className="seg-landing-v4-utility" aria-label="Messages"><Mail aria-hidden="true" /></button>
          <button type="button" className="seg-landing-v4-utility" aria-label="Settings"><Settings aria-hidden="true" /></button>
        </div>
      </header>

      <main className="seg-landing-v4-main">
        <section className="seg-landing-v4-hero" aria-labelledby="landing-title">
          <section className="seg-landing-v4-critical" aria-label="Emergency response countdown">
            <div className="seg-landing-v4-critical-ring" aria-hidden="true"><i /></div>
            <div className="seg-landing-v4-critical-copy">
              <span>TIME IS CRITICAL</span>
              <strong>02:45:18</strong>
              <small><b>HRS</b><b>MIN</b><b>SEC</b></small>
              <em>EVERY SECOND<br />COUNTS</em>
            </div>
          </section>

          <div className="seg-landing-v4-copy">
            <p className="seg-landing-v4-kicker"><Sparkles aria-hidden="true" />Emergency Medicine Learning Platform</p>
            <h1 id="landing-title">PREPARE <span>SMARTER, <b>RESPOND BETTER</b></span></h1>
            <p>The ultimate platform for emergency medicine learning and clinical excellence.</p>
            <div className="seg-landing-v4-benefits">
              {benefits.map(({ title, detail, icon: Icon }) => <article key={title}><Icon aria-hidden="true" /><div><strong>{title}</strong><span>{detail}</span></div></article>)}
            </div>
            <Link href={SEG_ROUTES.register} className="seg-landing-v4-action" aria-label={SEG_PUBLIC_ACTIONS.startJourney}>
              <span>GET STARTED</span><ArrowRight aria-hidden="true" />
            </Link>
          </div>

          <div className="seg-landing-v4-scene" role="img" aria-label="Approved SEG emergency-response and brain-heart intelligence visuals">
            <div className="seg-landing-v4-grid" aria-hidden="true" />
            <div className="seg-landing-v4-monitor" aria-hidden="true"><BrainCircuit /><span /><Activity /></div>
            <img className="seg-landing-v4-response" src={segAssets.landingEmergencyResponseStage} alt="" aria-hidden="true" />
            <img className="seg-landing-v4-brain-heart" src={segAssets.landingBrainHeartStage} alt="" aria-hidden="true" />
            <div className="seg-landing-v4-ecg" aria-hidden="true"><svg viewBox="0 0 620 80" preserveAspectRatio="none"><path d="M0 45h88l26-24 25 47 38-66 28 43h84l24-17 25 35 37-51 35 33h89" /></svg></div>
          </div>
        </section>

        <section className="seg-landing-v4-metrics" aria-label="SEG learning statistics">
          {metrics.map(({ value, label, icon: Icon }) => <article key={label}><Icon aria-hidden="true" /><div><strong>{value}</strong><span>{label}</span><i aria-hidden="true" /></div></article>)}
        </section>

        <section id="capabilities" className="seg-landing-v4-capabilities" aria-labelledby="capabilities-title">
          <h2 id="capabilities-title">Everything you need to learn, practice and excel</h2>
          <div>
            {capabilities.map(({ title, body, details, icon: Icon, kind }) => <article className={`is-${kind}`} key={title}><Icon aria-hidden="true" /><ChevronRight aria-hidden="true" /><h3>{title}</h3><p>{body}</p>{details && <ul aria-label="Smart References and Tools content">{details.map((detail) => <li key={detail}>{detail}</li>)}</ul>}</article>)}
          </div>
        </section>

        <section id="trust" className="seg-landing-v4-trust" aria-label="Why professionals trust SEG">
          {trustValues.map(({ title, icon: Icon }) => <article key={title}><Icon aria-hidden="true" /><span>{title}</span></article>)}
        </section>
      </main>
    </div>
  );
}

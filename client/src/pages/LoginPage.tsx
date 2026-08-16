import { startLogin } from "@/const";
import { segAssets } from "@/lib/seg-assets";
import { SEG_PUBLIC_ACTIONS } from "@/lib/seg-copy";
import { SEG_ROUTES } from "@/lib/seg-navigation";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ArrowRight, Eye, HeartPulse, LoaderCircle, LockKeyhole, Mail, ShieldCheck } from "lucide-react";
import React, { FormEvent, useState } from "react";
import { flushSync } from "react-dom";
import { toast } from "sonner";
import { Link } from "wouter";

const socialOptions = [
  { label: "Google", mark: "G", className: "is-google" },
  { label: "Microsoft", mark: "", className: "is-microsoft" },
  { label: "Apple", mark: "●", className: "is-apple" },
] as const;

export default function LoginPage() {
  const [isRedirecting, setIsRedirecting] = useState(false);

  function beginAuthentication() {
    flushSync(() => setIsRedirecting(true));
    startLogin();
  }

  function beginLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    beginAuthentication();
  }

  return (
    <div className="seg-login-v2-page">
      <div className="seg-login-v2-layout">
        <div className="seg-login-v2-particles" aria-hidden="true" />
        <img className="seg-login-v2-stage seg-login-v2-heart-stage" src={segAssets.loginHeartStage} alt="" aria-hidden="true" />
        <img className="seg-login-v2-stage seg-login-v2-brain-stage" src={segAssets.loginBrainHeartStage} alt="" aria-hidden="true" />
        <aside className="seg-login-v2-status" aria-label="System status: all systems operational">
          <span>SYSTEM STATUS</span>
          <strong><i aria-hidden="true" />All Systems Operational</strong>
        </aside>
        <header className="seg-login-v2-brand-wrap">
          <nav aria-label="Display settings">
            <p className="seg-login-v2-language"><span className="sr-only">Current language: </span>EN</p>
            <ThemeToggle className="seg-login-v2-theme-toggle" />
          </nav>
          <img className="seg-login-v2-brand-lockup" src={segAssets.loginOfficialLockup} alt="SEG — Smart Emergency Guide. Emergency Medicine Learning Platform" />
        </header>

        <main className="seg-login-v2-main">
          <section className="seg-login-v2-card" aria-labelledby="login-heading">
            <div className="seg-login-v2-heading">
              <h1 id="login-heading">Welcome Back</h1>
              <p>Login to continue to your account</p>
            </div>

            <form className="seg-login-v2-form" onSubmit={beginLogin}>
              <label className="seg-login-v2-field">
                <span className="sr-only">Email Address</span>
                <Mail aria-hidden="true" />
                <input autoComplete="email" type="email" name="email" placeholder="Email Address" required />
              </label>
              <label className="seg-login-v2-field">
                <span className="sr-only">Password</span>
                <LockKeyhole aria-hidden="true" />
                <input autoComplete="current-password" type="password" name="password" placeholder="Password" required />
                <Eye className="seg-login-v2-password-eye" aria-hidden="true" />
              </label>
              <div className="seg-login-v2-options">
                <label className="seg-login-v2-remember">
                  <input type="checkbox" defaultChecked />
                  <span>Remember me</span>
                </label>
                <button type="button" onClick={() => toast.info("Password recovery will be available in the next authentication phase.")}>Forgot password?</button>
              </div>
              <button type="submit" className="seg-login-v2-submit" disabled={isRedirecting}>
                {isRedirecting ? <><LoaderCircle className="seg-auth-loading-icon" aria-hidden="true" /> Preparing My Home…</> : <>{SEG_PUBLIC_ACTIONS.login}<ArrowRight aria-hidden="true" /></>}
              </button>
            </form>

            <div className="seg-login-v2-divider"><span />OR CONTINUE WITH<span /></div>
            <div className="seg-login-v2-socials">
              {socialOptions.map((option) => (
                <button type="button" key={option.label} onClick={beginAuthentication} disabled={isRedirecting} className="seg-login-v2-social">
                  <span className={`seg-login-v2-social-mark ${option.className}`} aria-hidden="true">{option.mark}</span>
                  <span>{option.label}</span>
                </button>
              ))}
            </div>
            <p className="seg-login-v2-register-prompt">Don’t have an account? <Link href={SEG_ROUTES.register}>{SEG_PUBLIC_ACTIONS.register}</Link></p>
          </section>

          <section className="seg-login-v2-trust-grid" aria-label="Trust and privacy information">
            <article className="seg-login-v2-trust-card">
              <ShieldCheck aria-hidden="true" />
              <div><h2>SECURE &amp; PRIVATE</h2><p>Your data is protected with advanced encryption</p></div>
            </article>
            <article className="seg-login-v2-trust-card">
              <HeartPulse aria-hidden="true" />
              <div><h2>TRUSTED BY</h2><p>Medical Professionals Worldwide</p></div>
            </article>
          </section>
        </main>
      </div>
    </div>
  );
}

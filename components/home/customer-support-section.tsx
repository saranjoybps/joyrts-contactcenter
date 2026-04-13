"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./customer-support-section.module.css";

const supportPoints = [
  {
    title: "24/7 live coverage",
    description:
      "Answers every call around the clock with a consistent, on-brand voice so customers never hit voicemail or long hold times.",
    cta: "See live coverage",
    panelTitle: "Always on",
    panelSub: "Coverage across every hour",
    vis: [
      { label: "After-hours calls", val: "Handled automatically", pct: 98 },
      { label: "Weekend volume", val: "No coverage gaps", pct: 96 },
      { label: "Holiday spikes", val: "Routed instantly", pct: 94 },
    ],
    metrics: [{ n: "24/7", l: "Coverage" }, { n: "< 1s", l: "Pick-up time" }],
    tags: ["Voice AI", "Overflow support", "Always on"],
  },
  {
    title: "Automated call handling",
    description:
      "Captures intent, qualifies the request, and routes each call to the right team without manual triage slowing things down.",
    cta: "View call automation",
    panelTitle: "Smart routing",
    panelSub: "Call automation in action",
    vis: [
      { label: "Call intent captured", val: "97% accurate", pct: 97 },
      { label: "Correct team routing", val: "94% accurate", pct: 94 },
      { label: "Manual transfers", val: "Reduced", pct: 88 },
    ],
    metrics: [{ n: "3x", l: "Faster routing" }, { n: "97%", l: "Accuracy" }],
    tags: ["Intent detection", "Auto-route", "No hold queues"],
  },
  {
    title: "AI workflow automation",
    description:
      "Automates repetitive workflows like ticket creation, follow-up messages, and CRM updates so the team can move faster.",
    cta: "See workflow automation",
    panelTitle: "Workflow engine",
    panelSub: "Automated tasks completed",
    vis: [
      { label: "Tickets created", val: "Automatically", pct: 100 },
      { label: "Follow-ups sent", val: "Instantly", pct: 98 },
      { label: "CRM updated", val: "In real time", pct: 95 },
    ],
    metrics: [{ n: "0", l: "Manual steps" }, { n: "100%", l: "Workflow sync" }],
    tags: ["CRM-ready", "Auto-ticketing", "Follow-up automation"],
  },
  {
    title: "Lower support costs",
    description:
      "Cuts repetitive work and reduces call handling time, helping your team serve more customers without adding overhead.",
    cta: "Calculate savings",
    panelTitle: "Savings dashboard",
    panelSub: "Cost efficiency by workflow",
    vis: [
      { label: "Handle time", val: "Reduced", pct: 91 },
      { label: "Support load", val: "Automated", pct: 89 },
      { label: "Operational cost", val: "Lowered", pct: 93 },
    ],
    metrics: [{ n: "24/7", l: "Coverage" }, { n: "50%", l: "Cost saving" }],
    tags: ["Cost control", "Auto-summary", "Process automation"],
  },
] as const;

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

export default function CustomerSupportSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const update = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = Math.max(rect.height - window.innerHeight, 1);
      const progress = clamp(-rect.top / total, 0, 1);
      const next = Math.min(supportPoints.length - 1, Math.floor(progress * supportPoints.length));
      if (next !== activeIndex) {
        setFading(true);
        setTimeout(() => { setActiveIndex(next); setFading(false); }, 220);
      }
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => { window.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, [activeIndex]);

  const ap = supportPoints[activeIndex];

  return (
    <section ref={sectionRef} className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 pb-32">
      <div className={styles.frame}>
        <div className={styles.stickyShell}>
          <div className={styles.header}>
            <p className={styles.eyebrow}>24/7 contact center support</p>
            <h2 className={styles.heading}>
              We deliver <span className={styles.headingAccent}>24/7 support</span> and
              automate calls with <span className={styles.headingAccent}>AI workflows</span>.
            </h2>
            <p className={styles.subtext}>
              We answer calls around the clock, route every request intelligently, and automate repetitive
              workflows so your team can focus on the work that matters most.
            </p>
          </div>
          <div className={styles.grid}>
            <div className={styles.accordion}>
              {supportPoints.map((point, i) => (
                <button
                  key={point.title}
                  type="button"
                  className={`${styles.accordionItem} ${i === activeIndex ? styles.accordionItemActive : ""}`}
                  onClick={() => { setFading(true); setTimeout(() => { setActiveIndex(i); setFading(false); }, 180); }}
                  aria-expanded={i === activeIndex}
                >
                  <div className={styles.accordionTitle}>{point.title}</div>
                  <div className={styles.accordionDescription}>
                    {point.description}
                    <div><span className={styles.accordionCta}>{point.cta} →</span></div>
                  </div>
                </button>
              ))}
            </div>

            <div className={styles.mediaPanel}>
              <div className={styles.mediaCard}>
                <div className={styles.mediaCardHeader}>
                  <div>
                    <div className={styles.mediaCardTitle}>{ap.panelTitle}</div>
                    <div className={styles.mediaCardSub}>{ap.panelSub}</div>
                  </div>
                  <span className={styles.stepBadge}>Step 0{activeIndex + 1}</span>
                </div>
                <div className={`${styles.mediaBody} ${fading ? styles.mediaBodyFade : ""}`}>
                  {ap.vis.map((v) => (
                    <div key={v.label} className={styles.visRow}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div className={styles.visLabel}>{v.label}</div>
                        <div className={styles.visVal}>{v.val}</div>
                      </div>
                      <div className={styles.progressWrap}>
                        <div className={styles.progressBar} style={{ width: `${v.pct}%` }} />
                      </div>
                    </div>
                  ))}
                  <div className={styles.metricRow}>
                    {ap.metrics.map((m) => (
                      <div key={m.l} className={styles.metricBox}>
                        <div className={styles.metricNum}>{m.n}</div>
                        <div className={styles.metricLbl}>{m.l}</div>
                      </div>
                    ))}
                  </div>
                  <div className={styles.tagRow}>
                    {ap.tags.map((t, i) => (
                      <span key={t} className={`${styles.tag} ${i === 0 ? styles.tagActive : ""}`}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

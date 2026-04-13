"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./customer-support-section.module.css";

const supportPoints = [
  {
    title: "Fastest across geographies",
    description:
      "Greets every caller instantly with a consistent, on-brand voice — no hold music, no delays, regardless of call volume or time zone.",
    cta: "See live demo",
    panelTitle: "Instant answer",
    panelSub: "Response speed by region",
    vis: [
      { label: "North America", val: "< 200ms", pct: 92 },
      { label: "Europe", val: "< 240ms", pct: 86 },
      { label: "Asia Pacific", val: "< 280ms", pct: 78 },
    ],
    metrics: [{ n: "99.9%", l: "Uptime" }, { n: "< 1s", l: "First response" }],
    tags: ["Voice AI", "Auto-greet", "24/7"],
  },
  {
    title: "Best-in-class fluency across languages",
    description:
      "Understands caller intent and routes each request to the right team — billing, tech support, sales — faster than any manual triage workflow.",
    cta: "View routing logic",
    panelTitle: "Smart routing",
    panelSub: "Routing accuracy by category",
    vis: [
      { label: "Billing queries", val: "97% accurate", pct: 97 },
      { label: "Tech support", val: "94% accurate", pct: 94 },
      { label: "Sales handoff", val: "91% accurate", pct: 91 },
    ],
    metrics: [{ n: "3x", l: "Faster routing" }, { n: "97%", l: "Accuracy" }],
    tags: ["NLP", "Intent detection", "Auto-route"],
  },
  {
    title: "Expressive and accurate voices",
    description:
      "Passes the full conversation context — caller name, issue, history — cleanly when a human agent joins, so nothing has to be repeated.",
    cta: "See handoff flow",
    panelTitle: "Clean handoff",
    panelSub: "Context transfer completeness",
    vis: [
      { label: "Caller context", val: "100% passed", pct: 100 },
      { label: "Issue history", val: "98% passed", pct: 98 },
      { label: "Prior resolutions", val: "95% passed", pct: 95 },
    ],
    metrics: [{ n: "0", l: "Repeat questions" }, { n: "100%", l: "Context passed" }],
    tags: ["Live transfer", "Context sync", "CRM-ready"],
  },
  {
    title: "Most cost-efficient at 1 cent per minute",
    description:
      "Ends every call with a clear next step — confirmation email, ticket number, callback time — so customers always know what happens next.",
    cta: "Calculate savings",
    panelTitle: "Clear follow-up",
    panelSub: "Post-call action completion",
    vis: [
      { label: "Confirmation sent", val: "100% of calls", pct: 100 },
      { label: "Ticket created", val: "98% of calls", pct: 98 },
      { label: "Callback scheduled", val: "89% of calls", pct: 89 },
    ],
    metrics: [{ n: "1¢", l: "Per minute" }, { n: "50%", l: "Cost saving" }],
    tags: ["Auto-summary", "Email follow-up", "Ticketing"],
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
            <p className={styles.eyebrow}>Customer support</p>
            <h2 className={styles.heading}>
              <span className={styles.headingAccent}>Fast</span> customer
              support built for <span className={styles.headingAccent}>JOYRTS</span>.
            </h2>
            <p className={styles.subtext}>Four steps that turn every call into a resolved ticket.</p>
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

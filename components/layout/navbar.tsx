"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const navLinks = [
  { label: "ABOUT", href: "#about" },
  { label: "SERVICES", href: "#services" },
  { label: "WORKFLOW", href: "#workflow" },
] as const;

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    const onResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <header className="pointer-events-none fixed left-0 right-0 top-0 z-50 px-3 pt-3 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl rounded-[1.4rem] border border-white/10 bg-slate-950/60 px-4 py-3 text-slate-50 shadow-[0_18px_60px_rgba(0,0,0,0.24)] backdrop-blur-xl sm:px-5">
        <div className="pointer-events-auto flex items-center justify-between gap-4">
          <Link
            href="/"
            className="shrink-0 transition hover:opacity-90"
            onClick={() => setIsOpen(false)}
          >
            <span className="sr-only">JOYRTS</span>
            <img
              src="/logo.png"
              alt="JOYRTS"
              width={1145}
              height={232}
              loading="eager"
              decoding="async"
              className="block h-8 w-auto max-w-none sm:h-9"
            />
          </Link>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-slate-50 transition hover:border-cyan-300/30 hover:bg-cyan-300/10 focus:outline-none focus:ring-2 focus:ring-cyan-300/50 md:hidden"
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsOpen((current) => !current)}
          >
            <span className="sr-only">
              {isOpen ? "Close navigation menu" : "Open navigation menu"}
            </span>
            <span className="relative block h-4 w-5">
              <span
                className={`absolute left-0 top-0 block h-0.5 w-5 rounded-full bg-current transition duration-200 ${
                  isOpen ? "translate-y-2 rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-1.5 block h-0.5 w-5 rounded-full bg-current transition duration-200 ${
                  isOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-3 block h-0.5 w-5 rounded-full bg-current transition duration-200 ${
                  isOpen ? "-translate-y-2 -rotate-45" : ""
                }`}
              />
            </span>
          </button>

          <nav
            aria-label="Primary"
            className="hidden flex-1 items-center justify-end gap-2 md:flex md:flex-wrap"
          >
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="rounded-full border border-white/8 bg-white/[0.04] px-3 py-2 text-[0.68rem] font-semibold tracking-[0.18em] text-slate-100/90 transition hover:border-cyan-300/30 hover:bg-cyan-300/10 hover:text-white lg:px-4 lg:py-3 lg:text-[0.72rem]"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full bg-[linear-gradient(90deg,#5ef3ff_0%,#4b88ff_50%,#845dff_100%)] px-4 py-2 text-[0.68rem] font-bold tracking-[0.18em] text-slate-950 transition hover:brightness-110 lg:px-5 lg:py-3 lg:text-xs"
            >
              BOOK A DEMO
            </a>
          </nav>
        </div>

        <div
          id="mobile-navigation"
          className={`pointer-events-auto overflow-hidden transition-[max-height,opacity,margin-top] duration-300 ease-out md:mt-0 md:max-h-none md:overflow-visible md:opacity-100 ${
            isOpen ? "mt-4 max-h-[32rem] opacity-100" : "mt-0 max-h-0 opacity-0 md:max-h-none"
          }`}
          >
          <nav
            aria-label="Primary"
            className="flex flex-col gap-2 md:hidden"
          >
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="rounded-full border border-white/8 bg-white/[0.04] px-4 py-3 text-[0.72rem] font-semibold tracking-[0.18em] text-slate-100/90 transition hover:border-cyan-300/30 hover:bg-cyan-300/10 hover:text-white md:px-3 md:py-2 md:text-[0.68rem]"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="mt-1 inline-flex items-center justify-center rounded-full bg-[linear-gradient(90deg,#5ef3ff_0%,#4b88ff_50%,#845dff_100%)] px-4 py-3 text-[0.72rem] font-bold tracking-[0.18em] text-slate-950 transition hover:brightness-110"
            >
              BOOK A DEMO
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}

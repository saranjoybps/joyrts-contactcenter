import Link from "next/link";

const navLinks = [
  { label: "ABOUT", href: "#about" },
  { label: "SERVICES", href: "#services" },
  { label: "WORKFLOW", href: "#workflow" },
  { label: "FAQ", href: "#faq" },
  { label: "CONTACT", href: "#contact" },
] as const;

export default function Navbar() {
  return (
    <header className="pointer-events-none fixed left-0 right-0 top-0 z-50 px-4 pt-3 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 rounded-[1.4rem] border border-white/10 bg-slate-950/55 px-4 py-3 text-slate-50 shadow-[0_18px_60px_rgba(0,0,0,0.24)] backdrop-blur-xl sm:px-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="pointer-events-auto flex items-center justify-between gap-4">
          <Link
            href="/"
            className="text-[0.72rem] font-black tracking-[0.32em] text-slate-50 transition hover:text-cyan-200 sm:text-xs"
          >
            JOYRTS
          </Link>
          <span className="hidden rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-[0.62rem] font-semibold tracking-[0.24em] text-cyan-100 sm:inline-flex">
            AI VOICE SUPPORT
          </span>
        </div>

        <div className="pointer-events-auto flex flex-wrap items-center gap-2 lg:justify-end">
          <nav
            aria-label="Primary"
            className="flex flex-1 flex-wrap items-center gap-2 lg:justify-end"
          >
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="rounded-full border border-white/8 bg-white/[0.04] px-3 py-2 text-[0.62rem] font-semibold tracking-[0.2em] text-slate-200/90 transition hover:border-cyan-300/30 hover:bg-cyan-300/10 hover:text-white sm:text-[0.68rem]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-full bg-[linear-gradient(90deg,#5ef3ff_0%,#4b88ff_50%,#845dff_100%)] px-4 py-2 text-[0.66rem] font-bold tracking-[0.18em] text-slate-950 transition hover:brightness-110 sm:px-5 sm:text-xs"
          >
            BOOK A DEMO
          </a>
        </div>
      </div>
    </header>
  );
}

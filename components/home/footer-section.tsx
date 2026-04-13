const footerLinks = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Workflow", href: "#workflow" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
] as const;

export default function FooterSection() {
  return (
    <footer className="mx-auto w-full max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
      <div className="px-2 py-8 sm:px-4">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-md">
            <img
              src="/logo.png"
              alt="JOYRTS"
              width={1145}
              height={232}
              className="block h-8 w-auto max-w-none sm:h-9"
              loading="eager"
              decoding="async"
            />
            <p className="mt-4 text-sm leading-7 text-slate-200/75">
              AI voice support for modern teams. We help calls start faster,
              route smarter, and hand off cleanly without losing context.
            </p>
          </div>

          <nav
            className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 lg:pt-1"
            aria-label="Footer navigation"
          >
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-slate-200/70 transition hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-4 lg:items-end">
            <span className="inline-flex w-fit rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-100">
              AI Voice Support
            </span>
            <a
              href="#about"
              className="inline-flex w-fit items-center justify-center rounded-full bg-[linear-gradient(90deg,#5ef3ff_0%,#4b88ff_45%,#845dff_100%)] px-5 py-3 text-sm font-semibold text-slate-950 transition hover:brightness-110"
            >
              Book a demo
            </a>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-5 text-xs text-slate-300/55 sm:flex sm:items-center sm:justify-between">
          <p>© 2026 JOYRTS. All rights reserved.</p>
          <p className="mt-2 sm:mt-0">Designed for voice-first customer support.</p>
        </div>
      </div>
    </footer>
  );
}

import { useEffect, useState } from "react";
import GlitchText from "./GlitchText";

const LINKS = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.id)).filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${
          scrolled
            ? "backdrop-blur-xl bg-black/70 border-primary/30 shadow-[0_1px_20px_rgba(61,169,255,0.15)]"
            : "bg-transparent border-transparent"
        }`}
      >
        <nav className="max-w-6xl mx-auto grid grid-cols-[auto_1fr_auto] items-center px-6 py-4 gap-4">
          <a href="#hero" className="flex items-center gap-2 justify-self-start">
            <span className="w-1.5 h-1.5 rounded-full bg-electric core-pulse" />
            <GlitchText
              as="span"
              text="Ahmed"
              className="font-display text-xl font-semibold tracking-tight text-primary-bright"
              runOnMount={false}
            />
          </a>

          <div className="hidden md:flex items-center justify-center gap-10">
            {LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className="relative py-1 text-sm font-medium transition-colors group"
              >
                <span
                  className={
                    active === link.id
                      ? "text-primary-bright"
                      : "text-text-secondary group-hover:text-text-primary transition-colors"
                  }
                >
                  {link.label}
                </span>
                <span
                  className={`absolute left-0 -bottom-1 h-[2px] bg-electric shadow-[0_0_8px_rgba(0,217,255,0.8)] transition-all duration-300 ${
                    active === link.id ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </button>
            ))}
          </div>

          <a
            href="/Ahmed_Selim_CV.pdf"
            download
            className="hidden md:inline-flex text-sm font-medium px-4 py-2 border border-primary-bright/50 text-primary-bright hover:bg-primary/10 hover:shadow-[0_0_16px_rgba(61,169,255,0.4)] transition-all justify-self-end"
            style={{
              clipPath:
                "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)",
            }}
          >
            Download CV
          </a>

          <button
            className="md:hidden text-text-primary justify-self-end"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <div className="w-6 flex flex-col gap-1.5">
              <span
                className={`h-[2px] bg-current transition-transform ${
                  menuOpen ? "translate-y-2 rotate-45" : ""
                }`}
              />
              <span className={`h-[2px] bg-current transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
              <span
                className={`h-[2px] bg-current transition-transform ${
                  menuOpen ? "-translate-y-2 -rotate-45" : ""
                }`}
              />
            </div>
          </button>
        </nav>
      </header>

      {/* Mobile full-screen overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black flex flex-col items-center justify-center gap-8 md:hidden transition-transform duration-500 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {LINKS.map((link) => (
          <button
            key={link.id}
            onClick={() => handleNavClick(link.id)}
            className="text-2xl font-display text-text-primary hover:text-primary-bright transition-colors"
          >
            {link.label}
          </button>
        ))}
        <a
          href="/Ahmed_Selim_CV.pdf"
          download
          className="text-lg px-6 py-3 border border-primary-bright text-primary-bright"
        >
          Download CV
        </a>
      </div>
    </>
  );
}

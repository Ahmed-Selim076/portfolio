import { useInView } from "../../hooks/useInView";
import Panel from "../ui/Panel";

export default function About() {
  const left = useInView<HTMLDivElement>(0.2);
  const right = useInView<HTMLDivElement>(0.2);

  return (
    <section id="about" className="relative py-28 md:py-36 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-start">
        <div
          ref={left.ref}
          className={`fade-left ${left.inView ? "is-visible" : ""} flex flex-col items-center md:items-start gap-8`}
        >
          <Panel className="w-56 h-56" tilt>
            <div className="w-full h-full flex items-center justify-center text-text-secondary font-mono text-xs">
              photo.png
            </div>
          </Panel>

          <div className="grid grid-cols-4 gap-3 w-full max-w-xs">
            {["React", "TS", ".NET", "SQL"].map((t) => (
              <div
                key={t}
                className="aspect-square border border-border flex items-center justify-center text-[11px] font-mono text-text-secondary hover:text-primary-bright hover:border-primary hover:shadow-[0_0_16px_rgba(47,129,255,0.3)] transition-all"
                style={{
                  clipPath:
                    "polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)",
                }}
              >
                {t}
              </div>
            ))}
          </div>
        </div>

        <div ref={right.ref} className={`fade-right ${right.inView ? "is-visible" : ""}`}>
          <p className="font-mono text-xs uppercase tracking-widest text-primary-bright mb-2">
            // about.ts
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold mb-6">About Me</h2>

          <div className="space-y-4 text-text-secondary leading-relaxed">
            <p>
              I&apos;m a self-taught full-stack developer from Egypt, passionate about
              building real products that solve real problems. I work across the entire
              stack — from database design and API architecture to pixel-perfect
              frontends.
            </p>
            <p>
              I taught myself to code while studying Agricultural Engineering, driven
              by curiosity and the desire to build things. That background taught me
              to think systematically and learn fast.
            </p>
            <p>When I&apos;m not coding, I&apos;m probably thinking about a new project idea.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

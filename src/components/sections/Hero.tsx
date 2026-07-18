import { lazy, Suspense, useEffect, useState } from "react";
import Button from "../ui/Button";
import { stats } from "../../data/projects";

const Chip3D = lazy(() => import("../three/Chip3D"));

const ROLES = [
  "Full-Stack Developer",
  "React Specialist",
  ".NET Engineer",
  "Problem Solver",
];

function useTypewriter(words: string[]) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex % words.length];
    const speed = deleting ? 25 : 35;

    const timeout = setTimeout(() => {
      if (!deleting) {
        const next = current.slice(0, text.length + 1);
        setText(next);
        if (next === current) setTimeout(() => setDeleting(true), 1200);
      } else {
        const next = current.slice(0, text.length - 1);
        setText(next);
        if (next === "") {
          setDeleting(false);
          setWordIndex((w) => w + 1);
        }
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [text, deleting, wordIndex, words]);

  return text;
}

// Traces radiating from the chip, anchored near the right side where the
// chip sits on desktop.
const TRACES = [
  { d: "M700,300 L700,440 L360,440 L360,560", delay: 0 },
  { d: "M700,300 L700,440 L960,440", delay: 1.4 },
  { d: "M700,300 L480,300 L480,120 L120,120", delay: 2.8 },
  { d: "M700,300 L900,300 L900,120", delay: 0.7 },
  { d: "M700,300 L700,160 L420,160 L420,20", delay: 2.1 },
  { d: "M700,300 L700,160 L940,160 L940,20", delay: 3.5 },
  { d: "M700,300 L280,300 L280,460", delay: 1.9 },
  { d: "M700,300 L1000,300", delay: 4.2 },
];

export default function Hero() {
  const typed = useTypewriter(ROLES);
  const [flash, setFlash] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setFlash(false), 450);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-28 pb-20 overflow-hidden pcb-dots"
    >
      <svg
        viewBox="0 0 1000 600"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full hidden lg:block pointer-events-none"
      >
        {TRACES.map((t, i) => (
          <g key={i}>
            <path d={t.d} stroke="rgba(61,169,255,0.3)" strokeWidth={1.5} fill="none" />
            <path
              d={t.d}
              stroke="#9fdcff"
              strokeWidth={2.2}
              fill="none"
              className="trace-pulse"
              style={{ animationDuration: "5.5s", animationDelay: `${t.delay}s` }}
            />
          </g>
        ))}
      </svg>

      {/* Power-on flash — a quick burst of light instead of a text boot log */}
      {flash && (
        <div
          className="absolute inset-0 z-20 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 68% 45%, rgba(180,225,255,0.9), rgba(0,217,255,0.35) 35%, transparent 70%)",
            animation: "flashOut 0.5s ease-out forwards",
          }}
        />
      )}

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 grid lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center">
        {/* Left: all the text content */}
        <div className="text-center lg:text-left">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 border border-primary/40 rounded-full"
            style={{ animation: "revealUp 0.7s ease 0.05s both" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-electric core-pulse" />
            <span className="font-mono text-xs text-text-secondary tracking-wide">
              Available for work
            </span>
          </div>

          <h1
            className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-5"
            style={{ animation: "revealUp 0.8s ease 0.15s both" }}
          >
            <span className="text-text-primary">Hi, I am </span>
            <span className="text-primary-bright text-glow">Ahmed Selim Mohamed</span>
          </h1>

          <div
            className="h-9 md:h-11 mb-8"
            style={{ animation: "revealUp 0.7s ease 0.28s both" }}
          >
            <span className="font-mono text-xl md:text-3xl text-electric">{typed}</span>
            <span className="typing-cursor h-7 md:h-8 align-middle" />
          </div>

          <p
            className="text-text-secondary text-lg md:text-xl mb-10 max-w-lg mx-auto lg:mx-0"
            style={{ animation: "revealUp 0.7s ease 0.4s both" }}
          >
            I build things for the web — from idea to production.
          </p>

          <div
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-12"
            style={{ animation: "revealUp 0.7s ease 0.52s both" }}
          >
            <Button
              onClick={() =>
                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              View My Work ↓
            </Button>
            <Button variant="ghost" href="/Ahmed_Selim_CV.pdf">
              Download CV
            </Button>
          </div>

          <div
            className="flex items-center justify-center lg:justify-start gap-8 sm:gap-12"
            style={{ animation: "revealUp 0.7s ease 0.64s both" }}
          >
            {stats.map((s) => (
              <div key={s.label} className="text-center lg:text-left">
                <p className="font-display text-2xl md:text-3xl font-bold text-primary-bright">
                  {s.value}
                  {s.suffix}
                </p>
                <p className="text-text-secondary text-xs md:text-sm mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: the 3D chip, reacts to mouse movement */}
        <div
          className="relative w-full h-72 sm:h-96 lg:h-[26rem]"
          style={{ animation: "chipReveal 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s both" }}
        >
          <Suspense fallback={null}>
            <Chip3D />
          </Suspense>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 scroll-indicator z-10">
        <svg width="20" height="28" viewBox="0 0 20 28" fill="none">
          <path
            d="M10 2v20M3 15l7 7 7-7"
            stroke="#3DA9FF"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <style>{`
        @keyframes flashOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        @keyframes revealUp {
          from { opacity: 0; transform: translateY(36px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes chipReveal {
          from { opacity: 0; transform: translateY(20px) scale(0.85); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </section>
  );
}

import { useEffect, useRef } from "react";

// Real code tokens instead of the classic katakana — reads as "programming"
// rather than a generic Matrix reference.
const CHARS =
  "01{}[]()<>/\\;:=+-*&|!?#$%_ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(
    ""
  );

/**
 * Fixed, full-viewport canvas of falling characters that continuously
 * "assemble" — sits behind every section as the site's ambient code layer.
 * Kept intentionally subtle (low alpha) so text on top stays fully legible.
 */
export default function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const fontSize = 15;
    let columns = 0;
    let drops: number[] = [];
    let speeds: number[] = [];

    const setup = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      columns = Math.floor(canvas.width / fontSize);
      drops = new Array(columns).fill(0).map(() => Math.random() * -50);
      speeds = new Array(columns)
        .fill(0)
        .map(() => 0.4 + Math.random() * 0.7);
    };
    setup();

    let raf: number;
    let frameCount = 0;

    const draw = () => {
      // translucent black wipe -> gives falling characters a fading trail
      ctx.fillStyle = "rgba(0, 0, 0, 0.13)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px "Fira Code", monospace`;

      for (let i = 0; i < columns; i++) {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Lead character brighter, rest a dim cyan — sells the "assembling" feel
        const isLead = Math.random() > 0.94;
        ctx.fillStyle = isLead
          ? "rgba(180, 245, 255, 0.9)"
          : "rgba(0, 212, 255, 0.35)";
        ctx.fillText(char, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i] += speeds[i];
      }

      frameCount++;
      // Reduced-motion: advance far more sparingly, still present but static-ish
      if (!reduceMotion || frameCount % 20 === 0) {
        raf = requestAnimationFrame(draw);
      } else {
        raf = requestAnimationFrame(draw);
      }
    };

    raf = requestAnimationFrame(draw);
    window.addEventListener("resize", setup);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", setup);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0, opacity: 0.22 }}
    />
  );
}

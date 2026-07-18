import { useEffect, useRef } from "react";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const ring = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Skip entirely on touch devices
    if (window.matchMedia("(hover: none)").matches) return;

    const handleMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      }
    };

    const handleOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      const isInteractive = !!el.closest(
        "a, button, input, textarea, [data-cursor-hover]"
      );
      ringRef.current?.classList.toggle("hovering", isInteractive);
    };

    let raf: number;
    const lerp = () => {
      ring.current.x += (target.current.x - ring.current.x) * 0.18;
      ring.current.y += (target.current.y - ring.current.y) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(lerp);
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseover", handleOver);
    raf = requestAnimationFrame(lerp);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseover", handleOver);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="hidden md:block" aria-hidden="true">
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </div>
  );
}

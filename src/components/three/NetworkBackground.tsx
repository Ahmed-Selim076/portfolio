import { useEffect, useRef } from "react";

/**
 * A structured, slowly-pulsing network graph — deliberately different from
 * the organic Hero particle cloud. Implemented with plain 2D canvas (no
 * Three.js needed) since it's a background decoration, not a 3D scene.
 */
export default function NetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const cols = 8;
    const rows = 5;
    const nodes: { x: number; y: number; phase: number }[] = [];

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        nodes.push({
          x: (width / (cols - 1)) * i,
          y: (height / (rows - 1)) * j,
          phase: Math.random() * Math.PI * 2,
        });
      }
    }

    let frame: number;
    let t = 0;

    const resize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", resize);

    const render = () => {
      t += 0.006;
      ctx.clearRect(0, 0, width, height);

      // Draw connections between nearby nodes
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = width / (cols - 1) + 10;
          if (dist < maxDist) {
            const pulse = 0.05 + 0.05 * Math.sin(t + a.phase);
            ctx.strokeStyle = `rgba(0, 212, 255, ${pulse})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      nodes.forEach((n) => {
        const pulse = 0.3 + 0.3 * Math.sin(t * 1.5 + n.phase);
        ctx.fillStyle = `rgba(0, 212, 255, ${pulse})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, 2, 0, Math.PI * 2);
        ctx.fill();
      });

      frame = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-60"
      aria-hidden="true"
    />
  );
}

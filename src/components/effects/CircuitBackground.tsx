import { useEffect, useRef } from "react";

interface Point {
  x: number;
  y: number;
}

interface Trace {
  points: Point[];
  length: number; // cumulative path length, for pulse placement
  segLengths: number[];
}

interface Pulse {
  traceIndex: number;
  progress: number; // 0..1 along the trace
  speed: number;
}

const GRID = 46;

function buildTrace(cols: number, rows: number): Point[] {
  let x = Math.floor(Math.random() * cols);
  let y = Math.floor(Math.random() * rows);
  const points: Point[] = [{ x, y }];
  const segments = 3 + Math.floor(Math.random() * 4);
  let lastAxis: "h" | "v" | null = null;

  for (let i = 0; i < segments; i++) {
    const axis: "h" | "v" = lastAxis === "h" ? "v" : lastAxis === "v" ? "h" : Math.random() > 0.5 ? "h" : "v";
    const step = 2 + Math.floor(Math.random() * 4);
    const dir = Math.random() > 0.5 ? 1 : -1;

    if (axis === "h") {
      x = Math.min(cols - 1, Math.max(0, x + step * dir));
    } else {
      y = Math.min(rows - 1, Math.max(0, y + step * dir));
    }
    points.push({ x, y });
    lastAxis = axis;
  }

  return points;
}

function traceMetrics(points: Point[], cell: number): { length: number; segLengths: number[] } {
  let length = 0;
  const segLengths: number[] = [];
  for (let i = 1; i < points.length; i++) {
    const dx = (points[i].x - points[i - 1].x) * cell;
    const dy = (points[i].y - points[i - 1].y) * cell;
    const segLen = Math.abs(dx) + Math.abs(dy);
    segLengths.push(segLen);
    length += segLen;
  }
  return { length, segLengths };
}

function pointAt(trace: Trace, cell: number, progress: number): Point {
  const target = progress * trace.length;
  let covered = 0;
  for (let i = 0; i < trace.segLengths.length; i++) {
    const segLen = trace.segLengths[i];
    if (target <= covered + segLen || i === trace.segLengths.length - 1) {
      const segProgress = segLen === 0 ? 0 : (target - covered) / segLen;
      const a = trace.points[i];
      const b = trace.points[i + 1];
      return {
        x: (a.x + (b.x - a.x) * segProgress) * cell,
        y: (a.y + (b.y - a.y) * segProgress) * cell,
      };
    }
    covered += segLen;
  }
  const last = trace.points[trace.points.length - 1];
  return { x: last.x * cell, y: last.y * cell };
}

export default function CircuitBackground({
  opacity = 1,
  pulseCount = 22,
}: {
  opacity?: number;
  pulseCount?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;
    let traces: Trace[] = [];
    let pulses: Pulse[] = [];

    const setup = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
      cols = Math.ceil(width / GRID) + 2;
      rows = Math.ceil(height / GRID) + 2;

      const traceCount = Math.max(18, Math.floor((width * height) / 55000));
      traces = Array.from({ length: traceCount }, () => {
        const points = buildTrace(cols, rows);
        const { length, segLengths } = traceMetrics(points, GRID);
        return { points, length, segLengths };
      });

      pulses = Array.from({ length: pulseCount }, () => ({
        traceIndex: Math.floor(Math.random() * traces.length),
        progress: Math.random(),
        speed: 0.0025 + Math.random() * 0.004,
      }));
    };

    setup();
    window.addEventListener("resize", setup);

    let frame: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Static traces — board silkscreen, brighter than before
      ctx.strokeStyle = "rgba(61, 169, 255, 0.22)";
      ctx.lineWidth = 1.1;
      traces.forEach((trace) => {
        ctx.beginPath();
        trace.points.forEach((p, i) => {
          const px = p.x * GRID;
          const py = p.y * GRID;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        });
        ctx.stroke();

        // via dot at each bend
        trace.points.forEach((p) => {
          ctx.fillStyle = "rgba(61, 169, 255, 0.4)";
          ctx.beginPath();
          ctx.arc(p.x * GRID, p.y * GRID, 1.8, 0, Math.PI * 2);
          ctx.fill();
        });
      });

      // Traveling current pulses
      pulses.forEach((pulse) => {
        pulse.progress += pulse.speed;
        if (pulse.progress > 1) {
          pulse.progress = 0;
          pulse.traceIndex = Math.floor(Math.random() * traces.length);
        }
        const trace = traces[pulse.traceIndex];
        const pos = pointAt(trace, GRID, pulse.progress);

        const gradient = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, 13);
        gradient.addColorStop(0, "rgba(200, 235, 255, 1)");
        gradient.addColorStop(0.35, "rgba(0, 217, 255, 0.7)");
        gradient.addColorStop(1, "rgba(0, 217, 255, 0)");
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 13, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#E4F4FF";
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 2, 0, Math.PI * 2);
        ctx.fill();
      });

      frame = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", setup);
    };
  }, [pulseCount]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity }}
      aria-hidden="true"
    />
  );
}

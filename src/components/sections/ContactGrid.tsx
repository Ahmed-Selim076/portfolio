import { useEffect, useRef, useState, type ComponentType } from "react";
import { Download, MessageCircle, Send, Mail } from "lucide-react";
import { contact } from "../../data/projects";

// lucide-react dropped brand/logo icons, so LinkedIn gets a small inline glyph
// that matches the same size/className API as the lucide icons around it.
function LinkedinIcon({ size = 18, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.5 4.78 5.75V21h-4v-5.6c0-1.34-.02-3.06-1.87-3.06-1.87 0-2.16 1.46-2.16 2.96V21H9z" />
    </svg>
  );
}

function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace("#", "");
  const bigint = parseInt(clean, 16);
  return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
}

const VB_W = 700;
const VB_H = 380;
const CX = 350;
const CY = 190;

type IconComponent = ComponentType<{ size?: number; className?: string }>;

interface NodeDef {
  id: string;
  label: string;
  href: string;
  icon: IconComponent;
  x: number;
  y: number;
  external?: boolean;
  download?: boolean;
  color: string;
}

const NODES: NodeDef[] = [
  { id: "cv", label: "Download CV", href: contact.cv, icon: Download, x: 120, y: 70, download: true, color: "#3da9ff" },
  { id: "linkedin", label: "LinkedIn", href: contact.linkedin, icon: LinkedinIcon, x: 580, y: 70, external: true, color: "#0A66C2" },
  { id: "whatsapp", label: "WhatsApp", href: contact.whatsapp, icon: MessageCircle, x: 640, y: 260, external: true, color: "#25D366" },
  { id: "telegram", label: "Telegram", href: contact.telegram, icon: Send, x: 350, y: 340, external: true, color: "#26A5E4" },
  { id: "email", label: "Email", href: `mailto:${contact.email}`, icon: Mail, x: 60, y: 260, color: "#EA4335" },
];

function elbowPath(x: number, y: number): [number, number][] {
  return [
    [CX, CY],
    [x, CY],
    [x, y],
  ];
}

function pathLength(path: [number, number][]) {
  let len = 0;
  for (let i = 1; i < path.length; i++) {
    len += Math.abs(path[i][0] - path[i - 1][0]) + Math.abs(path[i][1] - path[i - 1][1]);
  }
  return len;
}

function pointAt(path: [number, number][], len: number, t: number): [number, number] {
  const target = t * len;
  let covered = 0;
  for (let i = 1; i < path.length; i++) {
    const [x1, y1] = path[i - 1];
    const [x2, y2] = path[i];
    const seg = Math.abs(x2 - x1) + Math.abs(y2 - y1);
    if (target <= covered + seg || i === path.length - 1) {
      const p = seg === 0 ? 0 : (target - covered) / seg;
      return [x1 + (x2 - x1) * p, y1 + (y2 - y1) * p];
    }
    covered += seg;
  }
  return path[path.length - 1];
}

export default function ContactGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [active, setActive] = useState<string | null>(null);
  const activeRef = useRef<string | null>(null);
  activeRef.current = active;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = VB_W;
    canvas.height = VB_H;

    const state = NODES.map((n) => {
      const path = elbowPath(n.x, n.y);
      return { id: n.id, path, len: pathLength(path), pulse: Math.random(), surge: 0, rgb: hexToRgb(n.color) };
    });

    let frame: number;
    const render = () => {
      ctx.clearRect(0, 0, VB_W, VB_H);

      state.forEach((s) => {
        // static faint trace
        ctx.beginPath();
        s.path.forEach(([x, y], i) => (i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)));
        ctx.strokeStyle = "rgba(61,169,255,0.22)";
        ctx.lineWidth = 1.2;
        ctx.stroke();

        const isActive = activeRef.current === s.id;
        s.surge += (isActive ? 1 : 0) > s.surge ? 0.06 : isActive ? 0 : -0.06;
        s.surge = Math.max(0, Math.min(1, s.surge));

        const speed = 0.0035 + s.surge * 0.05;
        s.pulse = (s.pulse + speed) % 1;
        const [px, py] = pointAt(s.path, s.len, s.pulse);

        const glowR = 6 + s.surge * 9;
        const grad = ctx.createRadialGradient(px, py, 0, px, py, glowR);
        const [r, g, b] = s.rgb;
        const core = s.surge > 0.05 ? `rgba(${r},${g},${b},` : "rgba(61,169,255,";
        grad.addColorStop(0, core + "0.95)");
        grad.addColorStop(1, core + "0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(px, py, glowR, 0, Math.PI * 2);
        ctx.fill();
      });

      frame = requestAnimationFrame(render);
    };
    render();

    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="relative w-full max-w-2xl mx-auto" style={{ aspectRatio: `${VB_W} / ${VB_H}` }}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" aria-hidden="true" />

      {/* Central chip */}
      <div
        className="absolute w-16 h-16 md:w-20 md:h-20"
        style={{
          left: `${(CX / VB_W) * 100}%`,
          top: `${(CY / VB_H) * 100}%`,
          transform: "translate(-50%, -50%) rotate(45deg)",
        }}
      >
        <div className="absolute inset-0 border border-primary-bright shadow-[0_0_26px_4px_rgba(61,169,255,0.4)] bg-gradient-to-br from-[#0a1424] to-primary/20" />
        <div className="absolute inset-[22%] border border-electric" />
      </div>

      {NODES.map((node) => {
        const Icon = node.icon;
        const isActive = active === node.id;
        const [r, g, b] = hexToRgb(node.color);
        return (
          <a
            key={node.id}
            href={node.href}
            target={node.external ? "_blank" : undefined}
            rel={node.external ? "noreferrer" : undefined}
            download={node.download}
            onMouseEnter={() => setActive(node.id)}
            onMouseLeave={() => setActive(null)}
            className="absolute w-14 h-14 md:w-16 md:h-16 rounded-full flex flex-col items-center justify-center gap-1 border transition-all duration-300"
            style={{
              left: `${(node.x / VB_W) * 100}%`,
              top: `${(node.y / VB_H) * 100}%`,
              transform: `translate(-50%, -50%) ${isActive ? "scale(1.25)" : "scale(1)"}`,
              background: "radial-gradient(circle at 35% 30%, #0a1830, #050b16)",
              borderColor: isActive ? node.color : "rgba(10,108,255,0.35)",
              boxShadow: isActive
                ? `0 0 26px 6px rgba(${r},${g},${b},0.5)`
                : "0 0 10px 1px rgba(10,108,255,0.12)",
            }}
          >
            <Icon size={18} className="transition-colors text-text-secondary" style={{ color: isActive ? node.color : undefined }} />
            <span
              className="font-mono text-[8px] uppercase tracking-wider transition-colors text-text-secondary"
              style={{ color: isActive ? node.color : undefined }}
            >
              {node.label}
            </span>
          </a>
        );
      })}
    </div>
  );
}

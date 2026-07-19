import { useEffect, useRef, useState, type ComponentType, type CSSProperties } from "react";
import { Download, Mail } from "lucide-react";
import { contact } from "../../data/projects";

// lucide-react dropped brand/logo icons, so LinkedIn, WhatsApp, and Telegram get
// small inline glyphs that match the same size/className/style API as lucide icons.
function LinkedinIcon({
  size = 18,
  className = "",
  style,
}: {
  size?: number;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.5 4.78 5.75V21h-4v-5.6c0-1.34-.02-3.06-1.87-3.06-1.87 0-2.16 1.46-2.16 2.96V21H9z" />
    </svg>
  );
}

function WhatsappIcon({
  size = 18,
  className = "",
  style,
}: {
  size?: number;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.1-.472-.149-.67.15-.198.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347z" />
      <path d="M12.004 2C6.486 2 2.01 6.477 2.01 12c0 1.885.52 3.65 1.423 5.159L2 22l4.976-1.393A9.94 9.94 0 0 0 12.004 22C17.522 22 22 17.523 22 12S17.522 2 12.004 2zm0 18.062a8.03 8.03 0 0 1-4.098-1.123l-.294-.175-3.043.852.83-3.02-.192-.303a8.03 8.03 0 0 1-1.226-4.293c0-4.453 3.626-8.078 8.083-8.078 4.456 0 8.082 3.625 8.082 8.078 0 4.454-3.626 8.062-8.142 8.062z" />
    </svg>
  );
}

function TelegramIcon({
  size = 18,
  className = "",
  style,
}: {
  size?: number;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <path d="M21.426 2.574a1.573 1.573 0 0 0-1.634-.293L2.15 9.313a1.478 1.478 0 0 0 .105 2.767l4.463 1.462 1.714 5.476a.982.982 0 0 0 1.6.443l2.474-2.202 4.336 3.2a1.474 1.474 0 0 0 2.32-.908l3.02-14.516a1.573 1.573 0 0 0-.756-1.461ZM8.9 13.05l9.062-6.71-7.13 7.51-.31 3.24-1.622-4.04Z" />
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

type IconComponent = ComponentType<{ size?: number; className?: string; style?: CSSProperties }>;

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
  filled?: boolean;
}

const NODES: NodeDef[] = [
  { id: "cv", label: "Download CV", href: contact.cv, icon: Download, x: 120, y: 70, download: true, color: "#8B5CF6" },
  { id: "linkedin", label: "LinkedIn", href: contact.linkedin, icon: LinkedinIcon, x: 580, y: 70, external: true, color: "#0A66C2", filled: true },
  { id: "whatsapp", label: "WhatsApp", href: contact.whatsapp, icon: WhatsappIcon, x: 640, y: 260, external: true, color: "#25D366", filled: true },
  { id: "telegram", label: "Telegram", href: contact.telegram, icon: TelegramIcon, x: 350, y: 340, external: true, color: "#26A5E4", filled: true },
  { id: "email", label: "Email", href: `mailto:${contact.email}`, icon: Mail, x: 60, y: 260, color: "#3da9ff" },
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
        const rgb = `${r},${g},${b}`;
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
              transform: `translate(-50%, -50%) ${isActive ? "scale(1.15)" : "scale(1)"}`,
              background: node.filled
                ? `radial-gradient(circle at 32% 26%, rgba(255,255,255,0.35), rgba(${rgb},0.15) 30%, ${node.color} 75%)`
                : `radial-gradient(circle at 32% 28%, rgba(${rgb},0.18), #050b16 70%)`,
              borderColor: node.filled ? `rgba(255,255,255,${isActive ? 0.55 : 0.28})` : `rgba(${rgb}, ${isActive ? 0.9 : 0.4})`,
              boxShadow: isActive
                ? `0 0 22px 4px rgba(${rgb},0.55)`
                : `0 0 10px 1px rgba(${rgb},0.22)`,
            }}
          >
            <Icon size={19} className="transition-colors duration-300" style={{ color: node.filled ? "#fff" : node.color }} />
            <span
              className="font-mono text-[7.5px] uppercase tracking-wider transition-colors duration-300"
              style={{ color: node.filled ? "rgba(255,255,255,0.9)" : "rgba(180,200,225,0.6)" }}
            >
              {node.label}
            </span>
          </a>
        );
      })}
    </div>
  );
}

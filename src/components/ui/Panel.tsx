import { useRef, type ReactNode } from "react";

const CUT = "12px";
const CLIP =
  `polygon(${CUT} 0, calc(100% - ${CUT}) 0, 100% ${CUT}, 100% calc(100% - ${CUT}), calc(100% - ${CUT}) 100%, ${CUT} 100%, 0 calc(100% - ${CUT}), 0 ${CUT})`;

interface PanelProps {
  children: ReactNode;
  className?: string;
  tilt?: boolean;
}

export default function Panel({ children, className = "", tilt = true }: PanelProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tilt || !wrapperRef.current || !innerRef.current) return;
    const rect = wrapperRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    innerRef.current.style.transform = `perspective(800px) rotateX(${py * -8}deg) rotateY(${px * 10}deg) translateZ(6px)`;
  };

  const handleLeave = () => {
    if (!innerRef.current) return;
    innerRef.current.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0px)";
  };

  return (
    <div
      ref={wrapperRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="p-[1px] transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(47,129,255,0.25)]"
      style={{
        clipPath: CLIP,
        background:
          "linear-gradient(135deg, rgba(94,168,255,0.7), rgba(47,129,255,0.15) 40%, rgba(94,168,255,0.5))",
      }}
    >
      <div
        ref={innerRef}
        className={`bg-surface backdrop-blur-sm transition-transform duration-300 ease-out will-change-transform ${className}`}
        style={{ clipPath: CLIP }}
      >
        {children}
      </div>
    </div>
  );
}

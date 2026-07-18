import type { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "ghost";
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
}

const NOTCH_CLIP =
  "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)";

export default function Button({
  children,
  href,
  onClick,
  variant = "primary",
  type = "button",
  disabled,
  className = "",
}: ButtonProps) {
  const base =
    "inline-flex items-center gap-2 px-6 py-3 font-medium text-sm transition-all duration-300 focus-ring disabled:opacity-50 disabled:cursor-not-allowed";
  const styles =
    variant === "primary"
      ? "bg-primary text-white hover:shadow-[0_0_30px_rgba(47,129,255,0.45)] hover:-translate-y-0.5"
      : "border border-border text-text-primary hover:border-primary hover:text-primary-bright";

  const classes = `${base} ${styles} ${className}`;
  const style = { clipPath: NOTCH_CLIP };

  if (href) {
    return (
      <a href={href} className={classes} style={style}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes} style={style}>
      {children}
    </button>
  );
}

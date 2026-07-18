import { useEffect, useRef, useState } from "react";

const GLITCH_CHARS = "!@#%&*<>/\\{}[]?$";

interface GlitchTextProps {
  text: string;
  as?: "h1" | "span" | "div";
  className?: string;
  runOnMount?: boolean;
  triggerOnHover?: boolean;
}

/**
 * Briefly randomizes characters into symbols, then resolves back to the
 * real text. Runs once on mount and again on hover, max 600ms per spec.
 */
export default function GlitchText({
  text,
  as = "span",
  className = "",
  runOnMount = true,
  triggerOnHover = true,
}: GlitchTextProps) {
  const [display, setDisplay] = useState(text);
  const intervalRef = useRef<number | null>(null);

  const runGlitch = () => {
    if (intervalRef.current) window.clearInterval(intervalRef.current);
    const duration = 600;
    const stepTime = 35;
    const steps = Math.floor(duration / stepTime);
    let step = 0;

    intervalRef.current = window.setInterval(() => {
      step++;
      const revealCount = Math.floor((step / steps) * text.length);
      const next = text
        .split("")
        .map((char, i) => {
          if (char === " ") return " ";
          if (i < revealCount) return char;
          return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
        })
        .join("");
      setDisplay(next);

      if (step >= steps) {
        setDisplay(text);
        if (intervalRef.current) window.clearInterval(intervalRef.current);
      }
    }, stepTime);
  };

  useEffect(() => {
    if (runOnMount) runGlitch();
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  const Tag = as;

  return (
    <Tag
      className={className}
      onMouseEnter={triggerOnHover ? runGlitch : undefined}
      data-cursor-hover={triggerOnHover ? true : undefined}
    >
      {display}
    </Tag>
  );
}

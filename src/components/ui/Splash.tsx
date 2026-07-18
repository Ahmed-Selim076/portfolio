import { useEffect, useState } from "react";

const DISPLAY_MS = 2000;
const FADE_MS = 500;

export default function Splash() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFading(true), DISPLAY_MS);
    const removeTimer = setTimeout(() => setVisible(false), DISPLAY_MS + FADE_MS);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] bg-bg flex items-center justify-center transition-opacity duration-500 ${
        fading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      aria-hidden="true"
    >
      <div className="relative w-[70px] h-[70px] rotate-45 splash-chip">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a1424] to-primary/20 border border-primary-bright shadow-[0_0_26px_4px_rgba(61,169,255,0.4)]" />
        <div className="absolute inset-[28%] border-2 border-electric shadow-[0_0_12px_var(--electric)]" />
      </div>
    </div>
  );
}

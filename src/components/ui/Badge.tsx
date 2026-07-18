export default function Badge({ label }: { label: string }) {
  return (
    <span
      className="px-3 py-1.5 text-xs font-mono border border-border text-text-secondary
        transition-all duration-300 hover:border-primary hover:text-primary-bright hover:shadow-[0_0_16px_rgba(47,129,255,0.3)]"
      style={{
        clipPath:
          "polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)",
      }}
    >
      {label}
    </span>
  );
}

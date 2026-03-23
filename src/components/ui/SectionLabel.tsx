"use client";

interface SectionLabelProps {
  children: React.ReactNode;
  light?: boolean;
  centered?: boolean;
  className?: string;
}

export default function SectionLabel({
  children,
  light = false,
  centered = false,
  className = "",
}: SectionLabelProps) {
  const textColor = light ? "text-green-light" : "text-green-mid";
  const lineColor = light ? "bg-green-light" : "bg-green-sage";
  const line = <span className={`block h-px w-[30px] shrink-0 ${lineColor}`} />;

  return (
    <span
      className={`inline-flex items-center gap-3 font-sans text-[0.7rem] font-medium uppercase tracking-[0.3em] ${textColor} ${className}`}
    >
      {centered && line}
      {line}
      {children}
      {centered && line}
    </span>
  );
}

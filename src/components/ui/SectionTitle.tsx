"use client";

interface SectionTitleProps {
  children: React.ReactNode;
  light?: boolean;
  as?: "h1" | "h2" | "h3";
  className?: string;
}

export default function SectionTitle({
  children,
  light = false,
  as: Tag = "h2",
  className = "",
}: SectionTitleProps) {
  const color = light ? "text-cream" : "text-green-dark";

  return (
    <Tag
      className={`font-serif font-light leading-[1.15] tracking-tight ${color} ${className} [&_em]:not-italic [&_em]:text-green-mid [&_em]:italic`}
      style={{ fontSize: "clamp(2.2rem, 4vw, 3.8rem)" }}
    >
      {children}
    </Tag>
  );
}

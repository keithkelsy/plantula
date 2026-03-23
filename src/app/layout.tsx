import type { Metadata } from "next";
import { cormorant, outfit } from "@/lib/fonts";
import SplashScreen from "@/components/layout/SplashScreen";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Plántula — Estudio Botánico y de Paisajismo",
    template: "%s | Plántula",
  },
  description:
    "Estudio botánico y de paisajismo en Colombia. Diseñamos espacios que dialogan con la naturaleza: jardines, paisajismo residencial y corporativo.",
  keywords: ["paisajismo", "jardines", "botánica", "diseño exterior", "Colombia"],
  authors: [{ name: "Plántula" }],
  openGraph: {
    title: "Plántula — Estudio Botánico y de Paisajismo",
    description:
      "Diseñamos espacios que dialogan con la naturaleza.",
    siteName: "Plántula",
    locale: "es_CO",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${cormorant.variable} ${outfit.variable}`}>
      <body className="antialiased">
        <SplashScreen />
        {children}
      </body>
    </html>
  );
}

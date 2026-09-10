import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Navbar } from "@/components/ui/Navbar";
import { SectionProvider } from "@/context/SectionContext";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Portafolio · Diego A Caro",
  description:
    "Portafolio profesional hibrido: desarrollo de software e IA e ingenieria mecatronica. Escena 3D en tiempo real (React Three Fiber) con un LED que ilumina una PCB.",
  keywords: [
    "portafolio",
    "software",
    "inteligencia artificial",
    "mecatronica",
    "robotica",
    "three.js",
    "react three fiber",
    "Next.js",
  ],
};

export const viewport: Viewport = {
  themeColor: "#0A0D14",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-pcb-bg font-sans text-slate-200 antialiased">
        {/*
          SectionProvider expone la seccion activa a toda la app.
          La escena 3D (BackgroundScene), el HUD y la intro viven en
          app/page.tsx; cada <section> se registra en el observer.
        */}
        <SectionProvider>
          <Navbar />
          {children}
        </SectionProvider>
      </body>
    </html>
  );
}

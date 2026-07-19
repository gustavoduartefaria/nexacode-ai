import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#06080d",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export async function generateMetadata(): Promise<Metadata> {
  const headerStore = await headers();
  const host = headerStore.get("x-forwarded-host") ?? headerStore.get("host");
  const protocol =
    headerStore.get("x-forwarded-proto") ?? (host?.includes("localhost") ? "http" : "https");
  const base = new URL(host ? `${protocol}://${host}` : "http://localhost:3147");
  const socialImage = new URL("/og.png", base).toString();

  return {
    metadataBase: base,
    title: {
      default: "NexaCode AI — JavaScript, Python e C++",
      template: "%s · NexaCode AI",
    },
    description:
      "Plataforma tecnológica para aprender JavaScript, Python e C++ com aulas práticas, desafios e mentor inteligente local.",
    applicationName: "NexaCode AI",
    manifest: "/manifest.webmanifest",
    appleWebApp: {
      capable: true,
      statusBarStyle: "black-translucent",
      title: "NexaCode",
    },
    formatDetection: {
      telephone: false,
    },
    icons: {
      icon: [
        { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
        { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
      ],
      apple: [{ url: "/icon-192.png", sizes: "192x192", type: "image/png" }],
    },
    openGraph: {
      type: "website",
      locale: "pt_BR",
      title: "NexaCode AI — Três linguagens, uma jornada de engenharia",
      description:
        "JavaScript, Python e C++ em trilhas práticas com desafios e um mentor que ensina você a pensar.",
      siteName: "NexaCode AI",
      images: [
        {
          url: socialImage,
          width: 1536,
          height: 1024,
          alt: "NexaCode AI, laboratório tecnológico de JavaScript, Python e C++",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "NexaCode AI — JavaScript, Python e C++",
      description:
        "Aprenda JavaScript, Python e C++ com trilhas práticas e orientação inteligente.",
      images: [socialImage],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}

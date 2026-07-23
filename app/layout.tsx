import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

export const runtime = "nodejs";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#06080d" },
    { media: "(prefers-color-scheme: light)", color: "#f2f6f7" },
  ],
  colorScheme: "dark light",
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
      default: "NexaCode AI — Aprenda programação construindo",
      template: "%s · NexaCode AI",
    },
    description:
      "SaaS educacional para aprender JavaScript, Python e C++ com 44 aulas, laboratório, mentor contextual e progresso sincronizado.",
    applicationName: "NexaCode AI",
    manifest: "/manifest.webmanifest",
    appleWebApp: { capable: true, statusBarStyle: "black-translucent", title: "NexaCode" },
    formatDetection: { telephone: false },
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
      title: "NexaCode AI — Programação deixa de ser teoria",
      description:
        "JavaScript, Python e C++ com prática real, mentor contextual e progresso na nuvem.",
      siteName: "NexaCode AI",
      images: [{ url: socialImage, width: 1536, height: 1024, alt: "NexaCode AI, plataforma tecnológica para aprender programação" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "NexaCode AI — Aprenda programação construindo",
      description: "44 aulas, três linguagens e uma jornada prática de engenharia.",
      images: [socialImage],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body>
    </html>
  );
}

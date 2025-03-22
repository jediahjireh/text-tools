import type React from "react";

import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { ThemeProvider } from "@/components/ui/theme-provider";

import "@/styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Text Tools - Text Manipulation Application",
  description:
    "A cutesy text manipulation application built with Next.js and React. Offers various tools for text transformation, formatting, cleaning and analysis.",
  metadataBase: new URL("https://text-toolboxes.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "https://text-toolboxes.vercel.app",
    title: "Text Tools - Text Manipulation Application",
    description:
      "A cutesy text manipulation application built with Next.js and React. Offers various tools for text transformation, formatting, cleaning and analysis.",
    siteName: "Text Tools",
    images: [
      {
        // actual image url
        url: "/placeholder.svg",
        width: 1200,
        height: 630,
        alt: "Text Tools Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Text Tools - Text Manipulation Application",
    description:
      "A cutesy text manipulation application built with Next.js and React. Offers various tools for text transformation, formatting, cleaning and analysis.",
    images: ["/twitter-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  keywords: [
    "text tools",
    "text manipulation",
    "case converter",
    "text formatter",
    "next.js",
    "rich text editor",
    "text analysis",
    "text cleaning",
    "text transformation",
  ],
  authors: [
    {
      name: "Text Tools Team",
      url: "https://text-toolboxes.vercel.app",
    },
  ],
  creator: "Text Tools Team",
  publisher: "Text Tools Team",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#111111" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

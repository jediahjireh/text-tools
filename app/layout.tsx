import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { ThemeProvider } from "@/components/ui/theme-provider";

import "@/styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Text Tools",
  description:
    "A cutesy text manipulation application built with Next.js and React. Offers various tools for text transformation, formatting, cleaning and analysis.",
  openGraph: {
    type: "website",
    url: "https://text-toolboxes.vercel.app",
    title: "Text Tools",
    description:
      "A cutesy text manipulation application built with Next.js and React. Offers various tools for text transformation, formatting, cleaning and analysis.",
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
  /*
  twitter: {
    card: "summary_large_image",
    title: "Text Tools",
    description:
      "A cutesy text manipulation application built with Next.js and React. Offers various tools for text transformation, formatting, cleaning and analysis.",
  },
  */
  // additional SEO tags
  robots: "index, follow",
  keywords: [
    "text tools",
    "text manipulation",
    "case converter",
    "text formatter",
    "next.js",
  ],
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

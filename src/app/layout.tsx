import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import type { ReactNode } from "react";
import "lenis/dist/lenis.css";
import { Navbar } from "@/components/navbar";
import { ReadingProgress } from "@/components/reading-progress";
import { ScrollProvider } from "@/components/scroll-provider";
import "./globals.css";

const serif = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  weight: ["600"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin", "latin-ext"],
  weight: ["500"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Broken Knell",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="tr" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <ReadingProgress />
        <Navbar />
        <ScrollProvider>{children}</ScrollProvider>
      </body>
    </html>
  );
}

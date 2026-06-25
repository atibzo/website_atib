import type { Metadata } from "next";
import {
  Great_Vibes,
  Yellowtail,
  Cormorant_Garamond,
  Tiro_Devanagari_Sanskrit,
} from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
import Petals from "@/components/decor/Petals";
import CornerFrame from "@/components/decor/CornerFrame";
import MusicToggle from "@/components/MusicToggle";

const script = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-script",
  display: "swap",
});

const brush = Yellowtail({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-brush",
  display: "swap",
});

const serif = Cormorant_Garamond({
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const deva = Tiro_Devanagari_Sanskrit({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["devanagari", "latin"],
  variable: "--font-deva",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${siteConfig.couple.groom.firstName} & ${siteConfig.couple.bride.firstName} — A Sacred Union`,
  description: `Join us in celebrating the wedding of ${siteConfig.couple.groom.firstName} & ${siteConfig.couple.bride.firstName}.`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${script.variable} ${brush.variable} ${serif.variable} ${deva.variable}`}
    >
      <body className="font-serif antialiased overflow-x-hidden">
        {/* Global decorative layers */}
        <Petals />
        <CornerFrame />
        {children}
        <MusicToggle />
      </body>
    </html>
  );
}

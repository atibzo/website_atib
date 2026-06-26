import type { Metadata } from "next";
import { Pinyon_Script, Fraunces, Cormorant_Garamond, Jost, Amiri } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";

const script = Pinyon_Script({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-script",
  display: "swap",
});

const display = Fraunces({
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const serif = Cormorant_Garamond({
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Jost({
  weight: ["300", "400", "500"],
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const arabic = Amiri({
  weight: ["400", "700"],
  subsets: ["arabic", "latin"],
  variable: "--font-arabic",
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
      className={`${script.variable} ${display.variable} ${serif.variable} ${sans.variable} ${arabic.variable}`}
    >
      <body className="font-serif antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Golos_Text, Source_Serif_4, Unbounded } from "next/font/google";
import { CaptureAttribution } from "@/components/CaptureAttribution";
import "./globals.css";

const unbounded = Unbounded({
  subsets: ["cyrillic", "latin"],
  display: "swap",
  variable: "--font-unbounded",
});

const sourceSerif = Source_Serif_4({
  subsets: ["cyrillic", "latin"],
  display: "swap",
  variable: "--font-source-serif",
});

const golos = Golos_Text({
  subsets: ["cyrillic", "latin"],
  display: "swap",
  variable: "--font-golos",
});

const siteTitle = "Кварта — свежая обжарка, Минск";
const siteDescription =
  "Обжариваем в четверг — зерно у вас на 1–3 день; доставка по Минску и самовывоз на Короля, 9.";

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    locale: "ru_BY",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ru"
      className={`${unbounded.variable} ${sourceSerif.variable} ${golos.variable}`}
    >
      <body>
        <CaptureAttribution />
        {children}
      </body>
    </html>
  );
}

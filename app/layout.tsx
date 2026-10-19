import type { Metadata } from "next";
import { Golos_Text, Source_Serif_4, Unbounded } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Кварта — обжарка в Минске",
  description:
    "Обжариваем в четверг. В пятницу зерно уже у вас. Заявка на подписку или разовый заказ.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ru"
      className={`${unbounded.variable} ${sourceSerif.variable} ${golos.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}

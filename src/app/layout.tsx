import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";

const sans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lexica — Latihan Soal UTBK Cerdas",
  description:
    "Platform latihan soal UTBK/SNBT dengan AI Tutor, IRT Scoring adaptif, dan Chancing Engine untuk memaksimalkan peluang lolos SNBT.",
  keywords: ["UTBK", "SNBT", "Try Out", "Latihan Soal", "IRT", "AI Tutor", "Lexica"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${sans.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#f5f5f7] text-slate-900 font-sans tracking-tight">
        {children}
      </body>
    </html>
  );
}

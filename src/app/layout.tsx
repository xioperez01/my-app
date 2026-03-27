import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import { Noto_Serif_TC } from "next/font/google";
import "./globals.css";

const notoSerif = Noto_Serif_TC({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto-serif",
});

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-rubik",
});

export const metadata: Metadata = {
  title: "Advisor Dashboard",
  description: "Admin dashboard to manage advisors",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${rubik.variable} ${notoSerif.variable}`}>
      <body>{children}</body>
    </html>
  );
}

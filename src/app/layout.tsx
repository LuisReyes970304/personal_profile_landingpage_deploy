import type { Metadata } from "next";
import { DM_Serif_Display, Manrope } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { profile } from "@/lib/profile";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const dmSerifDisplay = DM_Serif_Display({
  variable: "--font-dm-serif-display",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: `${profile.name} — ${profile.role}`,
  description:
    "Desarrollo productos web rápidos y memorables donde el diseño, la tecnología y el propósito trabajan juntos.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      data-scroll-behavior="smooth"
      className={`${manrope.variable} ${dmSerifDisplay.variable} antialiased`}
    >
      <body className="min-h-screen overflow-x-hidden bg-ink font-sans text-cream">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

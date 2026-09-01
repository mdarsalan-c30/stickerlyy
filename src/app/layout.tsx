import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Stickerly - Advanced WhatsApp Stickers",
  description: "Create and search WhatsApp stickers easily.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geistSans.variable + " " + geistMono.variable + " h-full antialiased"}>
      <body className="min-h-full flex flex-col bg-gray-50 text-slate-900 pb-16">
        <Navbar />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
        <BottomNav />
      </body>
    </html>
  );
}

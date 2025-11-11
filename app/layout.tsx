import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header"; // Import the Header
import BottomNav from "@/components/BottomNav"; // Import the BottomNav

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NovaWay",
  description: "Your campus companion for navigating NOVA FCT",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* THE FIX: 
        I've removed "dark:bg-zinc-900" from this body tag.
      */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100`}
      >
        {/* THE FIX: 
          I've removed "dark:bg-black" from this div tag.
        */}
        <div className="flex min-h-screen max-w-md flex-col bg-white shadow-lg sm:mx-auto">
          <Header />
          <main className="flex-1 overflow-y-auto">{children}</main>
          <BottomNav />
        </div>
      </body>
    </html>
  );
}
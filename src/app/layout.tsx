import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@wrksz/themes/next";
import PageNavbar from "@/components/page-navbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Apex Pathing Visualizer",
  description: "Path generation, visualization, and programming tool for Apex Pathing",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-mono bg-black text-white">
        <ThemeProvider forcedTheme="dark" attribute="class" >
          {}
          <PageNavbar />

          {}
          <main className="flex-1 min-h-0 w-full">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import AnimatedBackground from "./_components/backgrounds/AnimatedBackground";

export const metadata: Metadata = {
  title: "Kent Leow - Software Engineer III",
  description: "Full Stack Software Engineer with 6+ years of experience in cross-platform mobile and web development using Flutter, Angular, React.js, Next.js, and TypeScript.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable}`}>
      <body className="relative min-h-screen overflow-x-hidden bg-bg-primary text-text-primary">
        {/* Global Animated Background */}
        <AnimatedBackground 
          intensity="moderate"
          pattern="mixed"
          className="fixed inset-0 z-0"
        />
        
        {/* Content Layer */}
        <div className="relative z-10">
          <TRPCReactProvider>{children}</TRPCReactProvider>
        </div>
      </body>
    </html>
  );
}

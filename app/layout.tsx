import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { AuthProvider } from "@/components/layout/auth-provider";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ForgeUI — Build beautiful interfaces faster",
  description: "A premium library of production-ready UI components, crafted for modern developers. Copy, customize, ship.",
  keywords: ["ui components", "react", "tailwind", "developer tools", "forgeui"],
  openGraph: {
    title: "ForgeUI",
    description: "Premium UI components for modern developers",
    type: "website",
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen bg-[#fcfcfc] dark:bg-[#0a0a0b] text-zinc-900 dark:text-zinc-100 antialiased overflow-x-hidden">
        <ThemeProvider>
          <AuthProvider>
            {children}
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

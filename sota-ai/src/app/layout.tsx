import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
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
  title: "SOTA.ai - State of the Art AI News",
  description: "Your daily dose of cutting-edge AI developments. AI-powered news curation that monitors 247 sources to bring you the most important breakthroughs in artificial intelligence.",
  keywords: "AI news, artificial intelligence, machine learning, deep learning, AI research, technology news",
  authors: [{ name: "SOTA.ai Team" }],
  openGraph: {
    title: "SOTA.ai - State of the Art AI News",
    description: "Your daily dose of cutting-edge AI developments",
    url: "https://sota.ai",
    siteName: "SOTA.ai",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SOTA.ai - State of the Art AI News",
    description: "Your daily dose of cutting-edge AI developments",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}

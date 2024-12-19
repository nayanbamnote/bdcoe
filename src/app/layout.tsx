import type { Metadata } from "next";
import { Recursive } from 'next/font/google'
import "./globals.css";
import { constructMetadata } from '@/lib/utils'
import Header from "@/components/LandingPageComponent/Header";
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from "@/components/ui/toaster";


const recursive = Recursive({ subsets: ['latin'] })

export const metadata= constructMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body
        className={`${recursive.className} antialiased flex flex-col`}
      >
        <Header/>
        {children}
        <Toaster />
      </body>
    </html>
    </ClerkProvider>
  );
}

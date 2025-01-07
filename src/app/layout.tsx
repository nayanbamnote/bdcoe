import type { Metadata } from "next";
import { Recursive } from 'next/font/google'
import "./globals.css";
import { constructMetadata } from '@/lib/utils'
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from '@/components/ui/toaster'
const recursive = Recursive({ subsets: ['latin'] })
import { EdgeStoreProvider } from '../lib/edgestore';

export const metadata = constructMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClerkProvider>
        <body className={`${recursive.className} antialiased flex flex-col`}>
        <EdgeStoreProvider>{children}</EdgeStoreProvider>
          <Toaster />
        </body>
      </ClerkProvider>
    </html>
  );
}

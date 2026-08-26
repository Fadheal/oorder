import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import Providers from "./providers";
import Script from "next/script"

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Oorder",
  description: "Self Order software service",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("light font-sans", inter.variable)}>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Providers>
          {children}

          <Script
            src="https://app.sandbox.midtrans.com/snap/snap.js"
            data-client-key={
              process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY
            }
            strategy="afterInteractive"
          />
        </Providers>
      </body>
    </html>
  );
}

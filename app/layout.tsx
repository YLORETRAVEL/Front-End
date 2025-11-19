import type { Metadata } from "next";
import "./globals.css";


import { DM_Sans } from "next/font/google";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"], 
  variable: "--font-sans",      
});

export const metadata: Metadata = {
  title: "Ylore Travel",
  description: "Explore the World with Ylore Travel - Your Gateway to Unforgettable Journeys",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}

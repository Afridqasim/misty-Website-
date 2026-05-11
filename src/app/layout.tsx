import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Plus 91 Design — 3D Exhibition Stand Design Agency",
  description:
    "Specialist 3D exhibition stand design studio for booth builders and exhibitors across Europe, UAE, USA, and India. Build-ready designs. Fast delivery.",
  keywords:
    "exhibition stand design, 3D booth design, trade show design, stall design, exhibition design agency",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body
        className="min-h-screen flex flex-col"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        <Navbar />
        <main className="flex-1 pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

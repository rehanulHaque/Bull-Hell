import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Blue Hell - Premium Fashion Store",
  description: "Shop the latest collections of premium clothing and fashion items. Trendy styles, great deals, and fast shipping.",
  keywords: "fashion, clothing, store, online shopping, apparel",
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="theme-color" content="#2563eb" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-900`}
      >
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <footer className="bg-gray-900 text-white mt-20 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              <div>
                <h3 className="text-lg font-bold mb-4">Blue Hell</h3>
                <p className="text-gray-400 text-sm">Your destination for premium fashion and lifestyle products.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Shop</h4>
                <ul className="text-gray-400 text-sm space-y-2">
                  <li><a href="#" className="hover:text-white transition">New Arrivals</a></li>
                  <li><a href="#" className="hover:text-white transition">Trending</a></li>
                  <li><a href="#" className="hover:text-white transition">Collections</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Support</h4>
                <ul className="text-gray-400 text-sm space-y-2">
                  <li><a href="#" className="hover:text-white transition">Contact Us</a></li>
                  <li><a href="#" className="hover:text-white transition">FAQs</a></li>
                  <li><a href="#" className="hover:text-white transition">Shipping Info</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Legal</h4>
                <ul className="text-gray-400 text-sm space-y-2">
                  <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-white transition">Terms & Conditions</a></li>
                  <li><a href="#" className="hover:text-white transition">Return Policy</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
              <p>&copy; 2024 Blue Hell. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

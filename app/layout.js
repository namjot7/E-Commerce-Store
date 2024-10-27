"use client"
import { Inter } from "next/font/google";
import "./globals.css";
import { SelectedProductsProvider } from "./components/SelectedProductsContext";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Online Store</title>
      </head>
      <body className={inter.className}>
        <SelectedProductsProvider >
          {children}
        </SelectedProductsProvider>

      </body>
    </html>
  );
}

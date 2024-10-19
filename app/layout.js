"use client"
import { Inter } from "next/font/google";
import "./globals.css";
import { SelectedProductsProvider } from "./components/SelectedProductsContext";
// import { useState } from "react";




const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "E-Commerce Store",
//   description: "Buy all types of electronic products here.",
// };

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <SelectedProductsProvider >
          {children}
        </SelectedProductsProvider>

      </body>
    </html>
  );
}

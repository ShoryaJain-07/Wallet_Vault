import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/context/AuthProvider";
import dotenv from "dotenv";

dotenv.config();

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wallet Vault",
  description: "A website to show all your crypto transactions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>)
{
  return (
    <html lang="en">
      <AuthProvider>
          <body className={`${inter.className} bg-dark-1`}>{children}</body>
      </AuthProvider>
    </html>
  );
}

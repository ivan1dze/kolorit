import type { Metadata } from "next";
import "./globals.css";
import Header from "@/app/components/Header/Header";

export const metadata: Metadata = {
  title: "Колорит - магазин автокрасок",
  description: "...",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
      <html lang="ru">
      <body>
      <Header />
      {children}
      </body>
      </html>
  );
}

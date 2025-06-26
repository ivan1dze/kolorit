import type { Metadata } from "next";
import "./globals.css";
import Header from "@/app/components/Header/Header";
import SecondaryHeader from "@/app/components/SecondaryHeader/SecondaryHeader";
import ContactCardServer from "@/app/components/ContactCard/ContactCardServer";
import { CartProvider } from "@/app/components/CartContext";

export const metadata: Metadata = {
    title: "Колорит - магазин автокрасок",
    description: "...",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ru">
        <body>
        <CartProvider>
            <Header />
            <SecondaryHeader />
            {children}
            <ContactCardServer />
        </CartProvider>
        </body>
        </html>
    );
}

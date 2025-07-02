import type { Metadata } from "next";
import "./globals.css";
import Header from "@/app/components/Header/Header";
import SecondaryHeader from "@/app/components/SecondaryHeader/SecondaryHeader";
import ContactCardServer from "@/app/components/ContactCard/ContactCardServer";
import { CartProvider } from "@/app/components/CartContext";
import Footer from "@/app/components/Footer/Footer";

export const metadata: Metadata = {
    title: "Колорит - магазин автокрасок",
    description: "Колорит - ведущий поставщик автокрасок, автохимии и материалов для кузовного ремонта в Беларуси. Широкий ассортимент, качественные материалы, быстрая доставка по всей стране.",
    keywords: [
        "автокраска", "автохимия", "материалы для кузовного ремонта",
        "лакокрасочные материалы", "автосервис", "кузовной ремонт",
        "Беларусь", "Минск", "ColorDrive", "Колорит"
    ],
    openGraph: {
        type: 'website',
        locale: 'ru_RU',
        url: 'https://colordrive.by',
        title: 'ColorDrive.by - Магазин автокрасок',
        },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            'max-image-preview': 'large',
            'max-snippet': -1
        }
    }
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
            <Footer />
        </CartProvider>
        </body>
        </html>
    );
}

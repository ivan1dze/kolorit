import Image from 'next/image';
import styles from './ContactsPage.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Контакты — Колорит',
    description: 'Контактная информация магазина Колорит: адрес, телефон, карта проезда.',
    openGraph: {
        title: 'Контакты — Колорит',
        description: 'Свяжитесь с магазином Колорит. Адрес, телефон, карта проезда.',
    },
};

export default function ContactsPage() {
    return (
        <main className={styles.page}>

            <div className={styles.imageWrapper}>
                <Image
                    src="/images/kolorit-storefront.png" // сохрани файл сюда: public/images/kolorit-storefront.png
                    alt="Магазин Колорит"
                    width={1216}
                    height={381}
                    className={styles.image}
                />
            </div>
        </main>
    );
}

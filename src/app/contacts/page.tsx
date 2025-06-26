import OntactCardClient from "../components/ContactCard/СontactCardClient";
import Image from 'next/image';
import styles from './ContactsPage.module.css';

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

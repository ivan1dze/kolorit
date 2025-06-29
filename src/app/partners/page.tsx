import Image from 'next/image';
import styles from './PartnersPage.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Сотрудничество — Колорит',
    description: 'Условия партнёрства с магазином Колорит. Выгодные предложения, индивидуальные заказы и качественный сервис.',
    openGraph: {
        title: 'Сотрудничество — Колорит',
        description: 'Оригинальные материалы, индивидуальные условия, качественное обслуживание. Узнайте больше о партнёрстве с Колорит.',
    },
};

export default function PartnersPage() {
    return (
        <main className={styles.page}>
            {/* Заголовок */}
            <h1 className={styles.heading}>Сотрудничество</h1>

            {/* Условия */}
            <section className={styles.conditions}>
                <div className={styles.banner}>Условия сотрудничества</div>
                <p className={styles.subheading}>Для наших покупателей мы предлагаем:</p>
                <div className={styles.cards}>
                    <div className={styles.card}>Оригинальная продукция мировых брендов: лаки, грунты, шпатлёвки, полироли, абразивы, сопутствующие материалы</div>
                    <div className={styles.card}>Возможность формирования индивидуальных заказов на продукцию под ваши потребности</div>
                    <div className={styles.card}>Качественный сервис и своевременная обратная связь</div>
                    <div className={styles.card}>Индивидуальные условия партнёрства. Консультация для эффективного продвижения продукции</div>
                    <div className={styles.card}>Долгосрочное и взаимовыгодное сотрудничество</div>
                </div>
            </section>

            {/* Блок: покраска / компания */}
            <section className={styles.about}>
                {/* Верхняя строка */}
                <div className={styles.aboutGroup}>
                <div className={styles.row}>
                    <div className={styles.textBlock}>
                        <h2>Всё для покраски автомобиля</h2>
                        <p>
                            Мелочей в нашем деле не бывает. Мы предлагаем всё для покраски автомобиля. Лаки, грунты, шпатлёвки, полироли,
                            абразивы, сопутствующие материалы — всё это вы можете найти в нашем магазине «Колорит».
                        </p>
                    </div>
                    <div className={styles.imageWrapper}>
                        <Image
                            src="/images/service.png"
                            alt="Сервис"
                            width={600}
                            height={300}
                            className={`${styles.image} ${styles.desktopOnly}`}
                        />
                        <Image
                            src="/images/carmob.png"
                            alt="Сервис"
                            width={768}
                            height={500}
                            className={`${styles.image} ${styles.mobileOnly}`}
                        />
                    </div>
                </div>
                </div>

                <div className={styles.aboutGroup}>
                <div className={styles.row}>
                    <div className={styles.imageWrapper}>
                        <Image
                            src="/images/car-kolorit.png"
                            alt="Автомобиль Колорит"
                            width={600}
                            height={300}
                            className={`${styles.image} ${styles.desktopOnly}`}
                        />
                        <Image
                            src="/images/carx6mob.png"
                            alt="Автомобиль"
                            width={768}
                            height={500}
                            className={`${styles.image} ${styles.mobileOnly}`}
                        />
                    </div>
                    <div className={styles.textBlock}>
                        <h2>О компании</h2>
                        <p>
                            Наша компания работает в сфере торговли лакокрасочными материалами уже более 13 лет. Мы имеем дело с
                            продукцией из Беларуси, Италии, России, Польши, Китая и многих других стран. Наши специалисты постоянно
                            развиваются и следят за новыми разработками в области кузовного ремонта.
                        </p>
                    </div>
                </div>
                </div>
            </section>

            {/* Ассортимент и новинки */}
            <section className={styles.catalog}>
                <h2>Ассортимент и новинки</h2>
                <p>
                    <a href="/" className={styles.link}>Ассортимент</a> товаров, представленных на сайте, очень широк и постоянно
                    обновляется. Все новинки, как и проверенные временем бренды, вы найдёте в нашем каталоге.
                </p>
                <p className={styles.mutedNote}>
                    Выбрать материалы для покраски автомобиля и остаться довольным ценами и качеством — это реально,
                    <span className={styles.strongTail}> убедитесь с нами</span>.
                </p>
            </section>

            <div className={styles.imageWrapper2}>
                <Image
                    src="/images/kolorit-storefront.png"
                    alt="Магазин Колорит"
                    width={1216}
                    height={500}
                    className={styles.image}
                />
            </div>
        </main>
    );
}

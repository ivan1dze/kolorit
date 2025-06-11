import styles from './css/PromoBlock.module.css';
import Image from 'next/image';

const PromoBlock = () => {
    return (
        <section className={styles.wrapper}>
            {/* 💻 Десктопная версия */}
            <div className={styles.desktop}>
                <div className={styles.container}>
                    <div className={styles.textBlock}>
                        <h2>
                            Организация <span>«ПРОФАВТОСТИЛЬ»</span>
                        </h2>
                        <p className={styles.sub}>
                            — официальный представитель и поставщик лакокрасочных материалов для кузовного ремонта
                        </p>
                        <ul>
                            <li>— Продукция ведущих мировых производителей</li>
                            <li>— Контроль качества и сертифицированные товары</li>
                            <li>— Профессиональный подбор красок включая эко-водные системы</li>
                            <li>— Автохимия масла запчасти</li>
                        </ul>
                        <button className={styles.button}>УЗНАТЬ ЕЩЁ</button>
                    </div>
                    <div className={styles.imageWrapper}>
                        <Image
                            src="/components/main/promo-car.png"
                            alt="Цветная машина"
                            fill
                            className={styles.carImage}
                        />
                    </div>
                </div>
            </div>

            {/* 📱 Мобильная версия */}
            <div className={styles.mobile}>
                <div className={styles.mobileContainer}>
                    <div className={styles.mobilecontent}>
                    <div className={styles.mobileText}>
                    <h2>
                        Организация <span>«ПРОФАВТОСТИЛЬ»</span>
                    </h2>
                    <p className={styles.sub}>
                        — официальный представитель и поставщик лакокрасочных материалов для кузовного ремонта
                    </p>
                    </div>
                    <div className={styles.mobileImage}>
                        <Image
                            src="/components/main/promo-car.png"
                            alt="Цветная машина"
                            width={400}
                            height={300}
                            className={styles.carImage}
                        />
                    </div>
                    <div className={styles.mobileText2}>
                    <ul>
                        <li>— Продукция ведущих мировых производителей</li>
                        <li>— Контроль качества и сертифицированные товары</li>
                        <li>— Профессиональный подбор красок включая эко-водные системы</li>
                        <li>— Автохимия масла запчасти</li>
                    </ul>
                    <button className={styles.button}>УЗНАТЬ ЕЩЁ</button>
                </div>
                </div>
                </div>
            </div>
        </section>
    );
};

export default PromoBlock;

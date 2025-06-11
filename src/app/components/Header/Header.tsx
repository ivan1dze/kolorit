import Image from 'next/image';
import styles from './Header.module.css';

const Header = () => {
    return (
        <header className={styles.header}>
            {/* 💻 ПК-версия */}
            <div className={styles.desktop}>
                <div className={styles.inner}>
                    <div className={styles.logo}>
                        <Image
                            src="/components/header/icon1.png"
                            alt="Логотип"
                            width={186}
                            height={139}
                            unoptimized
                            priority
                        />
                    </div>

                    <div className={styles.search}>
                        <input type="text" placeholder="Поиск" />
                        <button className={styles.searchButton}>
                            <img src="/components/header/search.png" alt="Поиск" width={24} height={24} />
                        </button>
                    </div>

                    <div className={styles.contacts}>
                        <div className={styles.phone}>
                            <p>+375 (29) 647-80-44</p>
                            <p>+375 (25) 779-00-42</p>
                        </div>
                        <div className={styles.order}>
                            <span>Прием заказов</span>
                            <span>Пн–Пт — с 9:00 до 17:00</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* 📱 Мобильная версия */}
            <div className={styles.mobile}>
                <div className={styles.mobileInner}>
                    <div className={styles.mobileLogo}>
                        <Image
                            src="/components/header/icon1.png"
                            alt="Логотип"
                            width={80}
                            height={80}
                            unoptimized
                            priority
                        />
                    </div>
                    <div className={styles.mobileOrder}>
                        <Image
                            src="/components/header/clock.png"
                            alt="Часы"
                            width={15}
                            height={15}
                        />
                        <div className={styles.mobileOrderText}>
                            <p>Прием заказов</p>
                            <p>Пн–Пт — с 9:00 до 17:00</p>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;

import Image from 'next/image';
import styles from './Header.module.css';
import { getContacts } from '../lib/getContacts';
import { Contact } from '../types/contact';

const Header = async () => {
    const contacts: Contact[] = await getContacts();

    return (
        <header className={styles.header}>
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
                            {contacts.map((contact) => (
                                <p key={contact.id}>
                                    <a href={`tel:${contact.phone.replace(/\s+/g, '')}`}>
                                        {contact.phone}
                                    </a>
                                </p>
                            ))}
                        </div>
                        <div className={styles.order}>
                            <span>Прием заказов</span>
                            <span>Пн–Пт — с 9:00 до 17:00</span>
                        </div>
                    </div>
                </div>
            </div>

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

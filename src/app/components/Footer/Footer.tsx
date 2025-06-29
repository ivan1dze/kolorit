'use client';

import styles from './Footer.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getContacts } from '../lib/getContacts';
import type { Contact } from '../types/contact';

export default function Footer() {
    const [contacts, setContacts] = useState<Contact[]>([]);

    useEffect(() => {
        getContacts().then(setContacts);
    }, []);

    return (
        <footer className={styles.footer}>
            <div className={styles.inner}>
                <div className={styles.columns}>
                    <div className={styles.col}>
                        <h2 className={styles.logo}>Колорит</h2>
                        <p className={styles.desc}>Всё для <br className={styles.break1} /> покраски <br className={styles.break} /> вашего авто</p>
                    </div>
                    <div className={styles.col}>
                        <div className={styles.menuWrapper}>
                            <div className={styles.menuLeft}>
                        <Link href="/categories" className={styles.link}>Каталог</Link>
                        <Link href="/contacts" className={styles.link}>Контакты</Link>
                        <Link href="/delivery" className={styles.link}>Доставка и оплата</Link>
                            </div>
                            <div className={styles.menuRight}>
                        <Link href="/blog" className={styles.link}>Блог</Link>
                        <Link href="/promotions" className={styles.link}>Акции</Link>
                        <Link href="/partners" className={styles.link}>Сотрудничество</Link>
                            </div>
                    </div>
                    </div>
                    <div className={styles.col}>
                        {contacts[0] && (
                            <>
                                <div className={styles.person}>
                                    Директор Жудро Олег Владимирович<br />
                                    {contacts[0].phone}
                                </div>
                            </>
                        )}
                        {contacts[1] && (
                            <div className={styles.person}>
                                Бухгалтерия Покаташкина Ирина Евгеньевна<br />
                                8 0232-25-16-31
                            </div>
                        )}
                        <Link href="https://vizioner.by/" className={styles.dev} target="_blank" rel="noopener noreferrer">
                            <span className={styles.devText}>Сайт разработан</span>
                            <Image
                                src="/components/footer/viz.svg"
                                alt="Разработчик"
                                width={61}
                                height={37}
                                className={styles.devIcon}
                                unoptimized
                            />
                        </Link>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <div className={styles.bottomLeft}>
                        <Link href="/privacy" className={styles.privacy}>Политика конфиденциальности</Link>
                        <p className={styles.org}>
                            ЧТУП «Профавтостиль»; 246000 г.Гомель, ул.Б.Хмельницкого д.59, к.27; УНП 490869593;
                            Свидетельство о государственной регистрации 490869593 от 28.03.2012.
                        </p>
                    </div>

                    <div className={styles.payments}>
                        <Image src="/components/footer/visa.svg" alt="Visa" width={53} height={17} unoptimized />
                        <Image src="/components/footer/ms.svg" alt="Mastercard" width={43} height={35} unoptimized />
                        <Image src="/components/footer/erip.svg" alt="ЕРИП" width={75} height={27} unoptimized />
                        <Image src="/components/footer/belka.svg" alt="Белкарт" width={91} height={21} unoptimized />
                        <Image src="/components/footer/bep.svg" alt="bePaid" width={74} height={22} unoptimized />
                    </div>
                </div>

            </div>
        </footer>
    );
}

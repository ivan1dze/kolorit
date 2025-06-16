'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';
import styles from './SecondaryHeader.module.css';
import { getCategories, Category } from '../lib/getCategories';
import { getContacts } from '../lib/getContacts';
import { Contact } from '../types/contact';

const SecondaryHeader = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [activeParentId, setActiveParentId] = useState<number | null>(null);

    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        getCategories().then(data => {
            const roots = data.filter(c => c.parent === null);
            setCategories(roots);
        });

        getContacts().then(data => {
            setContacts(data);
        });
    }, []);

    let dropdownCloseTimeout: NodeJS.Timeout;

    const handleMouseEnter = () => {
        clearTimeout(dropdownCloseTimeout);
        setShowDropdown(true);
    };

    const handleMouseLeave = () => {
        dropdownCloseTimeout = setTimeout(() => {
            setShowDropdown(false);
            setActiveParentId(null);
        }, 200);
    };

    const activeCategory = categories.find(cat => cat.id === activeParentId);
    const phone = contacts[0]?.phone?.replace(/[^+\d]/g, ''); // форматируем номер: убираем пробелы, скобки и тире

    return (
        <div className={styles.wrapper}>
            <nav className={styles.nav}>
                <div className={styles.links}>
                    <div
                        className={styles.catalogWrap}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <div className={styles.catalogTrigger}>
                            <span className={styles.catalogBtn}>
                                Каталог
                                <Image
                                    src="/components/header/arrow-down.png"
                                    alt="arrow"
                                    width={16}
                                    height={16}
                                    className={styles.catalogArrow}
                                />
                            </span>
                        </div>

                        {showDropdown && (
                            <div className={styles.dropdown} ref={dropdownRef}>
                                <div className={styles.left}>
                                    {categories.map(cat => (
                                        <div
                                            key={cat.id}
                                            className={`${styles.parentItem} ${activeParentId === cat.id ? styles.active : ''}`}
                                            onMouseEnter={() => setActiveParentId(cat.id)}
                                        >
                                            {cat.name}
                                        </div>
                                    ))}
                                </div>

                                {Array.isArray(activeCategory?.children) && activeCategory.children.length > 0 && (
                                    <div className={styles.right}>
                                        {activeCategory.children.map(child => (
                                            <div key={child.id} className={styles.childItem}>
                                                {child.name}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    <Link href="/delivery">Доставка и оплата</Link>
                    <Link href="/partners">Сотрудничество</Link>
                    <Link href="/blog">Блог</Link>
                    <Link href="/contacts">Контакты</Link>
                </div>

                <div className={styles.actions}>
                    {phone && (
                        <a href={`tel:${phone}`} className={styles.phoneBtn}>
                            <Image src="/components/header/phone.png" alt="phone" width={24} height={24} />
                        </a>
                    )}
                    <button className={styles.cartBtn}>
                        <Image src="/components/header/cart.png" alt="cart" width={24} height={24} />
                        <span className={styles.badge}>12</span>
                    </button>
                </div>
            </nav>
        </div>
    );
};

export default SecondaryHeader;

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';
import styles from './SecondaryHeader.module.css';
import { getCategories, Category } from '../lib/getCategories';
import { getContacts } from '../lib/getContacts';
import { Contact } from '../types/contact';
import { useHasMounted } from '../lib/useHasMounted';

const SecondaryHeader = () => {
    const hasMounted = useHasMounted();

    const [categories, setCategories] = useState<Category[]>([]);
    const [contacts, setContacts] = useState<Contact[]>([]);

    const [showDropdown, setShowDropdown] = useState(false);
    const [activeParentId, setActiveParentId] = useState<number | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    let dropdownCloseTimeout: NodeJS.Timeout;

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isCatalogOpen, setIsCatalogOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

    useEffect(() => {
        getCategories().then(data => {
            const roots = data.filter(c => c.parent === null);
            setCategories(roots);
        });

        getContacts().then(setContacts);
    }, []);

    const phone = contacts[0]?.phone?.replace(/[^+\d]/g, '');
    const activeCategory = categories.find(cat => cat.id === activeParentId);

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

    const handleCategoryClick = (category: Category) => {
        if (category.children.length > 0) {
            setSelectedCategory(category);
        }
    };

    const handleBackToCategories = () => {
        setSelectedCategory(null);
    };

    const handleCloseAll = () => {
        setIsMobileMenuOpen(false);
        setIsCatalogOpen(false);
        setSelectedCategory(null);
    };

    if (!hasMounted) return <div style={{ display: 'none' }} />;


    return (
        <>
            {/* 💻 DESKTOP */}
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
                                        src="/components/header/arrow-down.svg"
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
                                                <Link
                                                    key={child.id}
                                                    href={`/categories/${child.id}`}
                                                    className={styles.childItem}
                                                    onClick={() => setShowDropdown(false)}
                                                >
                                                    {child.name}
                                                </Link>
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
                                <Image src="/components/header/phones.svg" alt="phone" width={24} height={24} />
                            </a>
                        )}
                        <button className={styles.cartBtn}>
                            <Image src="/components/header/carts.svg" alt="cart" width={24} height={24} />
                            <span className={styles.badge}>12</span>
                        </button>
                    </div>
                </nav>
            </div>

            {/* 📱 MOBILE */}
            <div className={styles.mobileHeader}>
                <div className={styles.iconsleft}>
                <button onClick={() => setIsMobileMenuOpen(true)} className={styles.iconBtn}>
                    <Image src="/components/header/bgs.svg" alt="menu" width={24} height={24} />
                </button>

                <button onClick={() => setIsCatalogOpen(true)} className={styles.catalogButton}>
                    Каталог
                    <Image src="/components/header/arrow-rights.svg" alt="arrow" width={21} height={15} />
                </button>
                </div>
                <div className={styles.iconsRight}>
                    <button className={styles.iconBtn}>
                        <Image src="/components/header/search-whs.svg" alt="search" width={24} height={24} />
                    </button>

                    {phone && (
                        <a href={`tel:${phone}`} className={styles.iconBtn}>
                            <Image src="/components/header/phones.svg" alt="phone" width={24} height={24} />
                        </a>
                    )}

                    <button className={styles.iconBtn}>
                        <Image src="/components/header/carts.svg" alt="cart" width={24} height={24} />
                        <span className={styles.badge}>12</span>
                    </button>
                </div>
            </div>

            {isMobileMenuOpen && (
                <div className={styles.sideMenu}>
                    <button onClick={handleCloseAll} className={styles.closeBtn}>×</button>
                    <nav className={styles.mobileNav}>
                        <Link href="/delivery">Доставка и оплата</Link>
                        <Link href="/partners">Сотрудничество</Link>
                        <Link href="/blog">Блог</Link>
                        <Link href="/contacts">Контакты</Link>
                    </nav>
                    <div className={styles.bottomIcons}>
                        <button className={styles.iconBtn}>
                            <Image src="/components/header/search-bs.svg" alt="search" width={24} height={24} />
                        </button>
                        {phone && (
                            <a href={`tel:${phone}`} className={styles.iconBtn}>
                                <Image src="/components/header/phone-s.svg" alt="phone" width={24} height={24} />
                            </a>
                        )}
                        <button className={styles.iconBtn}>
                            <Image src="/components/header/cart-bs.svg" alt="cart" width={24} height={24} />
                            <span className={styles.badge}>12</span>
                        </button>
                    </div>
                </div>
            )}

            {isCatalogOpen && (
                <div className={styles.catalogMenu}>
                    <div className={styles.catalogTop}>
                        {selectedCategory && (
                            <button onClick={handleBackToCategories}>&lt;</button>
                        )}
                        <button onClick={handleCloseAll}>×</button>
                    </div>

                    {!selectedCategory && (
                        <div className={styles.catalogList}>
                            {categories.map(cat => (
                                <div
                                    key={cat.id}
                                    onClick={() => handleCategoryClick(cat)}
                                    className={styles.catalogItem}
                                >
                                    {cat.name}
                                </div>
                            ))}
                        </div>
                    )}

                    {selectedCategory && (
                        <div className={styles.catalogListSub}>
                            {selectedCategory.children.map(sub => (
                                <Link
                                    key={sub.id}
                                    href={`/categories/${sub.id}`}
                                    className={styles.subItem}
                                    onClick={handleCloseAll}
                                >
                                    {sub.name}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default SecondaryHeader;

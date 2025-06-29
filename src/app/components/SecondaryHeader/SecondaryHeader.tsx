'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';
import styles from './SecondaryHeader.module.css';
import { getCategories, Category } from '../lib/getCategories';
import { getContacts } from '../lib/getContacts';
import { Contact } from '../types/contact';
import { useHasMounted } from '../lib/useHasMounted';
import { useCart } from '@/app/components/CartContext';

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

    const [query, setQuery] = useState('');
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [showSearchResults, setShowSearchResults] = useState(false);
    const [showSearchInput, setShowSearchInput] = useState(false);
    const searchInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (query.length >= 2) {
                fetch(`https://api.colordrive.by/api/product/search/?search=${query}`)
                    .then(res => res.json())
                    .then(data => {
                        setSearchResults(data);
                        setShowSearchResults(true);
                    });
            } else {
                setShowSearchResults(false);
            }
        }, 400);

        return () => clearTimeout(timeout);
    }, [query]);

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

    const { count } = useCart();

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
                        <Link href="/promotions">Акции</Link>
                        <Link href="/contacts">Контакты</Link>
                    </div>

                    <div className={styles.actions}>
                        {phone && (
                            <a href={`tel:${phone}`} className={styles.phoneBtn}>
                                <Image src="/components/header/phones.svg" alt="phone" width={24} height={24} />
                            </a>
                        )}
                        <Link href="/cart" className={styles.cartBtn}>
                            <Image src="/components/header/carts.svg" alt="cart" width={24} height={24} />
                            {count > 0 && <span className={styles.badge}>{count}</span>}
                        </Link>
                    </div>
                </nav>
            </div>

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
                    <button
                        className={styles.iconBtn}
                        onClick={() => {
                            if (showSearchInput) {
                                setShowSearchInput(false);
                                setShowSearchResults(false);
                                setQuery('');
                                setSearchResults([]);
                            } else {
                                setShowSearchInput(true);
                                setTimeout(() => searchInputRef.current?.focus(), 100);
                            }
                        }}
                    >
                        <Image
                            src={
                                showSearchInput
                                    ? '/components/header/close-w.svg'
                                    : '/components/header/search-whs.svg'
                            }
                            alt="search"
                            width={24}
                            height={24}
                        />
                    </button>
                    {phone && (
                        <a href={`tel:${phone}`} className={styles.iconBtn}>
                            <Image src="/components/header/phones.svg" alt="phone" width={24} height={24} />
                        </a>
                    )}
                    <Link href="/cart" className={styles.cartBtn}>
                        <Image src="/components/header/carts.svg" alt="cart" width={24} height={24} />
                        {count > 0 && <span className={styles.badge}>{count}</span>}
                    </Link>
                </div>
            </div>

            {showSearchInput && (
                <div className={styles.searchWrapper}>
                    <input
                        type="text"
                        className={styles.searchInput}
                        placeholder="Найти товар"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        ref={searchInputRef}
                    />
                </div>
            )}

            {showSearchResults && (
                <div className={styles.searchResults}>
                    {searchResults.slice(0, 3).map(product => (
                        <Link
                            key={product.id}
                            href={`/products/${product.id}`}
                            className={styles.resultItem}
                            onClick={() => {
                                setShowSearchInput(false);
                                setShowSearchResults(false);
                                setQuery('');
                            }}
                        >
                            <div className={styles.resultImage}>
                                <Image
                                    src={product.photos?.[0]?.image || '/no-image.jpg'}
                                    alt={product.name}
                                    width={120}
                                    height={80}
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                            <div className={styles.resultInfo}>
                                <div className={styles.resultName}>{product.name}</div>
                                <div className={styles.resultMeta}>
                                    {product.filter_values?.map((f: { value: string }) => f.value).join(', ')}
                                </div>
                                <div className={styles.resultPrice}>{parseFloat(product.price).toFixed(2)} BYN</div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}

            {isMobileMenuOpen && (
                <div className={styles.sideMenu}>
                    <button onClick={handleCloseAll} className={styles.closeBtn}>×</button>
                    <nav className={styles.mobileNav}>
                        <Link href="/delivery" onClick={handleCloseAll}>Доставка и оплата</Link>
                        <Link href="/partners" onClick={handleCloseAll}>Сотрудничество</Link>
                        <Link href="/blog" onClick={handleCloseAll}>Блог</Link>
                        <Link href="/promotions" onClick={handleCloseAll}>Акции</Link>
                        <Link href="/contacts" onClick={handleCloseAll}>Контакты</Link>
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

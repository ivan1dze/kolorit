'use client';

import Image from 'next/image';
import styles from './Header.module.css';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

const Header = () => {
    const [contacts, setContacts] = useState<{ id: number; phone: string }[]>([]);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<any[]>([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    // Загружаем контакты
    useEffect(() => {
        fetch('https://api.colordrive.by/api/contacts/')
            .then((res) => res.json())
            .then(setContacts);
    }, []);

    // Поиск
    useEffect(() => {
        const delay = setTimeout(() => {
            if (query.length > 1) {
                fetch(`https://api.colordrive.by/api/product/search/?search=${query}`)
                    .then(res => res.json())
                    .then(data => {
                        console.log('search result:', data);
                        setResults(data);
                    });
            } else {
                setResults([]);
            }
        }, 300);
        return () => clearTimeout(delay);
    }, [query]);

    // Клик вне поиска
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (!inputRef.current?.contains(e.target as Node)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <header className={styles.header}>
            <div className={styles.desktop}>
                <div className={styles.inner}>
                    <div className={styles.logo}>
                        <Link href="/">
                            <Image
                                src="/components/header/icon1.png"
                                alt="Логотип"
                                width={186}
                                height={139}
                                unoptimized
                                priority
                            />
                        </Link>
                    </div>

                    <div className={styles.search} ref={inputRef}>
                        <input
                            type="text"
                            placeholder="Поиск"
                            value={query}
                            onChange={(e) => {
                                setQuery(e.target.value);
                                setShowDropdown(true);
                            }}
                            onFocus={() => setShowDropdown(true)}
                        />
                        <button className={styles.searchButton}>
                            <Image
                                src="/components/header/search.png"
                                alt="Поиск"
                                width={24}
                                height={24}
                            />
                        </button>

                        {showDropdown && results.length > 0 && (
                            <div className={styles.searchDropdown}>
                                {results.slice(0, 3).map((item) => (
                                    <Link
                                        href={`/products/${item.id}`}
                                        key={item.id}
                                        className={styles.result}
                                        onClick={() => {
                                            setQuery('');
                                            setShowDropdown(false);
                                        }}
                                    >
                                        <Image
                                            src={item.photos[0]?.image || '/placeholder.jpg'}
                                            alt={item.name}
                                            width={100}
                                            height={100}
                                            className={styles.resultImage}
                                        />
                                        <div className={styles.resultInfo}>
                                            <p className={styles.resultName}>{item.name}</p>
                                            <p className={styles.resultPrice}>
                                                {parseFloat(item.price).toFixed(2)} BYN
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
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
                        <Link href="/">
                            <Image
                                src="/components/header/icon1.png"
                                alt="Логотип"
                                width={80}
                                height={80}
                                unoptimized
                                priority
                            />
                        </Link>
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

'use client';

import { use } from 'react';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './CategoryPage.module.css';
import Link from 'next/link';
import ContactCardServer from '@/app/components/ContactCard/ContactCardServer';


interface Params {
    id: string;
}

interface FilterValue {
    id: number;
    value: string;
}

interface Filter {
    id: number;
    name: string;
    values: FilterValue[];
}

export default function CategoryPage({ params }: { params: Promise<Params> }) {
    const { id: categoryId } = use(params);

    const [data, setData] = useState<any>(null);
    const [originalFilters, setOriginalFilters] = useState<Filter[]>([]);
    const [selectedFilters, setSelectedFilters] = useState<{ [key: number]: number[] }>({});
    const [showAll, setShowAll] = useState<{ [key: number]: boolean }>({});
    const [dropdownPositions, setDropdownPositions] = useState<{ [key: number]: { top: number; left: number } }>({});
    const [visibleCount, setVisibleCount] = useState(9);
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [showMobileFilters, setShowMobileFilters] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const dropdownRefs = useRef<{ [key: number]: HTMLButtonElement | null }>({});
    const openDropdownRef = useRef<number | null>(null);

    const fetchData = async () => {
        const res = await fetch(`http://localhost/api/categories/${categoryId}/products/`);
        const json = await res.json();
        setData(json);
        setOriginalFilters(json.filters);
    };

    const applyFilters = async () => {
        const body: any = {
            filters: selectedFilters,
        };
        if (minPrice) body.min_price = parseFloat(minPrice);
        if (maxPrice) body.max_price = parseFloat(maxPrice);

        const res = await fetch(`http://localhost/api/categories/${categoryId}/products/filter/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });

        const json = await res.json();
        setData(prev => ({
            ...prev,
            products: json.products,
            total_products: json.total_products,
        }));
        setVisibleCount(9);
        setShowMobileFilters(false);
    };

    const resetFilters = async () => {
        setSelectedFilters({});
        fetchData();
        setVisibleCount(9);
    };

    const handleCheckboxChange = (filterId: number, valueId: number) => {
        setSelectedFilters(prev => {
            const prevValues = prev[filterId] || [];
            const newValues = prevValues.includes(valueId)
                ? prevValues.filter(v => v !== valueId)
                : [...prevValues, valueId];
            return { ...prev, [filterId]: newValues };
        });
    };

    const handleShowMoreDropdown = (filterId: number) => {
        const btn = dropdownRefs.current[filterId];
        if (btn) {
            const rect = btn.getBoundingClientRect();
            setDropdownPositions(prev => ({
                ...prev,
                [filterId]: {
                    top: rect.top + window.scrollY,
                    left: rect.right + 8,
                },
            }));
            setShowAll(prev => {
                const updated = { ...prev, [filterId]: !prev[filterId] };
                openDropdownRef.current = updated[filterId] ? filterId : null;
                return updated;
            });
        }
    };

    const handleShowMore = () => {
        setVisibleCount(prev => prev + 9);
    };

    const handleClickOutside = (e: MouseEvent) => {
        if (openDropdownRef.current !== null) {
            const button = dropdownRefs.current[openDropdownRef.current];
            const dropdown = document.getElementById(`dropdown-${openDropdownRef.current}`);
            if (
                button &&
                !button.contains(e.target as Node) &&
                dropdown &&
                !dropdown.contains(e.target as Node)
            ) {
                setShowAll(prev => ({ ...prev, [openDropdownRef.current!]: false }));
                openDropdownRef.current = null;
            }
        }
    };

    useEffect(() => {
        fetchData();
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        const update = () => setIsMobile(window.innerWidth <= 1000);
        update();
        window.addEventListener('resize', update);
        return () => window.removeEventListener('resize', update);
    }, []);

    if (!data) return <p></p>;

    const { products } = data;

    const filterContent = (
        <>
            <div className={styles.filter}>
                <p className={styles.filterTitle}>Цена</p>
                <div className={styles.priceInputs}>
                    <input
                        type="number"
                        placeholder="от"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="до"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                    />
                </div>
            </div>

            {originalFilters.map((filter) => (
                <div key={filter.id} className={styles.filter}>
                    <p className={styles.filterTitle}>{filter.name}</p>

                    {filter.values.slice(0, 5).map((value) => (
                        <label key={value.id} className={styles.checkboxLabel}>
                            <input
                                type="checkbox"
                                checked={selectedFilters[filter.id]?.includes(value.id) || false}
                                onChange={() => handleCheckboxChange(filter.id, value.id)}
                            />
                            {value.value}
                        </label>
                    ))}

                    {filter.values.length > 5 && (
                        <div className={styles.dropdownWrapper}>
                            <button
                                ref={(el) => (dropdownRefs.current[filter.id] = el)}
                                className={styles.showAllBtn}
                                onClick={() => {
                                    if (isMobile) {
                                        setShowAll(prev => ({ ...prev, [filter.id]: !prev[filter.id] }));
                                    } else {
                                        handleShowMoreDropdown(filter.id);
                                    }
                                }}
                            >
                                Все {filter.values.length} вариантов
                            </button>

                            {isMobile && showAll[filter.id] && (
                                <div className={styles.mobileDropdown}>
                                    {filter.values.map((value) => (
                                        <label key={value.id} className={styles.checkboxLabel}>
                                            <input
                                                type="checkbox"
                                                checked={selectedFilters[filter.id]?.includes(value.id) || false}
                                                onChange={() => handleCheckboxChange(filter.id, value.id)}
                                            />
                                            {value.value}
                                        </label>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            ))}

            <div className={styles.buttonsBlock}>
                <button className={styles.applyBtn} onClick={applyFilters}>ПОДОБРАТЬ</button>
                <button className={styles.resetBtn} onClick={resetFilters}>Сброс</button>
            </div>
        </>
    );

    return (
        <>
            <nav className={styles.breadcrumbs}>
                <Link href="/">Главная</Link> / <span>{data.category.name}</span>
            </nav>

            {isMobile && (
                <button className={styles.mobileFilterBtn} onClick={() => setShowMobileFilters(true)}>
                    <Image src="/components/header/filter.svg" alt="Фильтры" width={16} height={16} />
                    Добавить фильтры <span>{Object.values(selectedFilters).flat().length}</span>
                </button>
            )}

            {isMobile && showMobileFilters && (
                <div className={styles.mobileFilterOverlay}>
                    <div className={styles.mobileFilterHeader}>
                        <span>Фильтры</span>
                        <button onClick={() => setShowMobileFilters(false)}>✕</button>
                    </div>
                    <div className={styles.sidebar}>
                        {filterContent}
                    </div>
                </div>
            )}

            <div className={styles.page}>
                {!isMobile && <aside className={styles.sidebar}>{filterContent}</aside>}

                <section className={styles.grid}>
                    {products?.slice(0, visibleCount).map((product: any) => (
                        <Link href={`/products/${product.id}`} key={product.id} className={styles.card}>
                            <div className={styles.imageWrapper}>
                                <Image
                                    src={product.photos?.[0]?.image || '/placeholder.png'}
                                    alt={product.name}
                                    fill
                                    unoptimized
                                />
                            </div>
                            <h4>{product.name}</h4>
                            <p>{parseFloat(product.price) > 0 ? `${product.price} BYN` : 'Цена по запросу'}</p>
                            <button>В корзину</button>
                        </Link>
                    ))}

                    {visibleCount < products.length && (
                        <div className={styles.showMoreWrapper}>
                            <button className={styles.showMoreBtn} onClick={handleShowMore}>
                                Показать ещё
                            </button>
                        </div>
                    )}
                </section>
            </div>




            {/* Абсолютные дропдауны только на десктопе */}
            {!isMobile && originalFilters.map(filter => (
                showAll[filter.id] && dropdownPositions[filter.id] && (
                    <div
                        key={filter.id}
                        id={`dropdown-${filter.id}`}
                        className={styles.dropdown}
                        style={{
                            position: 'absolute',
                            top: dropdownPositions[filter.id].top,
                            left: dropdownPositions[filter.id].left,
                            zIndex: 9999,
                        }}
                    >
                        {filter.values.map((value) => (
                            <label key={value.id} className={styles.checkboxLabel}>
                                <input
                                    type="checkbox"
                                    checked={selectedFilters[filter.id]?.includes(value.id) || false}
                                    onChange={() => handleCheckboxChange(filter.id, value.id)}
                                />
                                {value.value}
                            </label>
                        ))}
                    </div>
                )
            ))}
        </>
    );
}

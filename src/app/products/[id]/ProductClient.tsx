'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './ProductPage.module.css';
import ProductVariations from '@/app/components/ProductVariations';
import PopularProducts from "@/app/components/PopularCard/PopularProducts";

type DescriptionBlock =
    | { type: 'heading'; content: string }
    | { type: 'text'; content: string }
    | { type: 'list'; content: string[] }
    | { type: 'specs'; content: { key: string; value: string }[] };


function parseDescription(description: string): DescriptionBlock[] {
    const blocks = description
        .split(/\n{2,}/)
        .map(block => block.trim())
        .filter(Boolean);

    return blocks.map(block => {
        if (block.match(/^[-–•*]?\s?[А-Яа-яA-Za-zёЁ]+\s*[:\-–]\s?.+/gm)) {
            const lines = block.split('\n').map(line => line.trim()).filter(Boolean);
            const specs = lines
                .map(line => line.split(/[:\-–]\s+/))
                .filter(pair => pair.length === 2)
                .map(([key, value]) => ({ key, value }));
            return { type: 'specs', content: specs };
        }

        if (block.match(/^[А-ЯA-ZЁ\s\-]{5,}$/)) {
            return { type: 'heading', content: block };
        }

        const lines = block.split('\n').map(line => line.trim()).filter(Boolean);
        if (lines.length > 1) {
            return { type: 'list', content: lines };
        }

        return { type: 'text', content: block };
    });
}


export default function ProductClient({ product }: { product: any }) {
    const [qty, setQty] = useState(1);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const price = parseFloat(product.price);
    const totalPrice = (price * qty).toFixed(2);
    const category = product.category;
    const descriptionBlocks = parseDescription(product.description || '');
    const photos = product.photos || [];

    const handleNext = () => {
        setCurrentImageIndex((prev) => (prev + 1) % photos.length);
    };

    const handlePrev = () => {
        setCurrentImageIndex((prev) => (prev - 1 + photos.length) % photos.length);
    };

    return (
        <>
            <main className={styles.page}>
                <nav className={styles.breadcrumbs}>
                    <Link href="/">Главная</Link> /{' '}
                    <Link href={`/categories/${category.id}`}>{category.name}</Link> /{' '}
                    <span>{product.name}</span>
                </nav>

                <div className={styles.mainBlock}>
                    <div className={styles.leftSide}>
                        <div className={styles.imageWrapper}>
                            <Image
                                src={photos?.[currentImageIndex]?.image || '/placeholder.png'}
                                alt={product.name}
                                fill
                                sizes="(max-width: 598px) 100vw, 598px"
                                className={styles.productImage}
                            />
                            {photos.length > 1 && (
                                <>
                                    <button className={styles.arrowLeft} onClick={handlePrev}>
                                        <Image src="/components/arrow-left.svg" alt="Назад" width={24} height={24} />
                                    </button>
                                    <button className={styles.arrowRight} onClick={handleNext}>
                                        <Image src="/components/arrow-right.svg" alt="Вперёд" width={24} height={24} />
                                    </button>
                                </>

                            )}
                            <div className={styles.imageOverlay}>
                                <span>Наличие товара уточняйте у менеджера</span>
                                <span>Артикул: {product.code}</span>
                            </div>
                        </div>
                    </div>

                    <div className={styles.rightSide}>
                        <h1 className={styles.title}>{product.name}</h1>

                        <div className={styles.priceRow}>
                            {price > 0 ? (
                                <>
                                    <span className={styles.priceValue}>{totalPrice}</span>
                                    <span className={styles.priceCurrency}>BYN</span>
                                </>
                            ) : (
                                <span className={styles.priceAlt}>Цена по запросу</span>
                            )}

                            <div className={styles.qtyStyled}>
                                <button onClick={() => setQty(prev => prev + 1)}>+</button>
                                <span>{qty}</span>
                                <button onClick={() => setQty(prev => Math.max(1, prev - 1))}>-</button>
                            </div>
                        </div>

                        <button
                            className={styles.addBtn}
                            onClick={() => {
                                const cart = JSON.parse(localStorage.getItem('cart') || '[]');
                                const existingIndex = cart.findIndex((item: any) => item.id === product.id);

                                const productToSave = {
                                    id: product.id,
                                    title: product.name,
                                    image: photos?.[0]?.image || '/placeholder.png',
                                    price: parseFloat(product.price),
                                    quantity: qty,
                                    variations: product.variations
                                        ?.flatMap((v: any) =>
                                            v.variations
                                                .filter((option: any) => option.current)
                                                .map((option: any) => ({
                                                    type: v.variation_type,
                                                    value: option.variation_text
                                                }))
                                        ) || [],
                                };

                                if (existingIndex >= 0) {
                                    cart[existingIndex].quantity += qty;
                                } else {
                                    cart.push(productToSave);
                                }
                                localStorage.setItem('cart', JSON.stringify(cart));
                                window.dispatchEvent(new Event('cartUpdated'));
                            }}
                        >
                            Добавить в корзину
                            <Image
                                src="/components/header/cart-bs.svg"
                                alt="cart"
                                width={20}
                                height={20}
                            />
                        </button>

                        <ProductVariations
                            productId={product.id}
                            variations={product.variations || []}
                        />
                    </div>
                </div>

                <div className={styles.descriptionGrid}>
                    {descriptionBlocks.map((block, i) => {
                        if (block.type === 'heading') {
                            return <h3 key={i} className={styles.heading}>{block.content}</h3>;
                        }
                        if (block.type === 'specs') {
                            return (
                                <ul key={i} className={styles.specsList}>
                                    {block.content.map((item: any, idx: number) => (
                                        <li key={idx}><strong>{item.key}:</strong> {item.value}</li>
                                    ))}
                                </ul>
                            );
                        }
                        if (block.type === 'list') {
                            return (
                                <ul key={i} className={styles.listBlock}>
                                    {(block.content as string[]).map((item, idx) => (
                                        <li key={idx}>{item}</li>
                                    ))}
                                </ul>
                            );
                        }
                        return <p key={i}>{block.content}</p>;
                    })}
                </div>
            </main>

            <PopularProducts />
        </>
    );
}

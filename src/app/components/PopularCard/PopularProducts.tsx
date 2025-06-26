'use client';

import { useEffect, useState } from 'react';
import styles from './PopularProducts.module.css';
import Link from 'next/link';
import Image from 'next/image';

export default function PopularProducts() {
    const [products, setProducts] = useState<any[]>([]);

    useEffect(() => {
        fetch('http://localhost/api/product/random/')
            .then(res => res.json())
            .then(data => setProducts(data.slice(0, 8)));
    }, []);

    return (
        <section className={styles.wrapper}>
            <div className={styles.wrapper2}>
            <h2 className={styles.title}>Популярные товары</h2>
            <div className={styles.grid}>
                {products.map(product => (
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
                        <p>
                            {parseFloat(product.price) > 0
                                ? `${product.price} BYN`
                                : 'Цена по запросу'}
                        </p>
                        <button>В корзину</button>
                    </Link>
                ))}
            </div>
            </div>
        </section>
    );
}

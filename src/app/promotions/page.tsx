'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './PromotionsPage.module.css';

interface Promotion {
    id: number;
    title: string;
    description: string;
    image: string;
}

export default function PromotionsPage() {
    const [promotions, setPromotions] = useState<Promotion[]>([]);

    useEffect(() => {
        fetch('https://api.colordrive.by/api/promotions/')
            .then(res => res.json())
            .then(data => setPromotions(data));
    }, []);

    return (
        <main className={styles.wrapper}>
            <h1 className={styles.title}>Акции</h1>
            <div className={styles.grid}>
                {promotions.map(promo => (
                    <div key={promo.id} className={styles.card}>
                        <div className={styles.image}>
                            <Image
                                src={promo.image}
                                alt={promo.title}
                                fill
                                style={{ objectFit: 'cover' }}
                                unoptimized
                            />
                        </div>
                        <h2 className={styles.promoTitle}>{promo.title}</h2>
                        <p className={styles.description}>{promo.description}</p>
                    </div>
                ))}
            </div>
        </main>
    );
}

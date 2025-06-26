'use client';

import { useRouter } from 'next/navigation';
import styles from '../products/[id]/ProductPage.module.css';

interface Variation {
    id: number;
    variation_text: string;
    current: boolean;
}

interface Group {
    variation_type: string;
    variations: Variation[];
}

interface Props {
    productId: number;
    variations: Group[];
}

export default function ProductVariations({ productId, variations }: Props) {
    const router = useRouter();

    return (
        <div className={styles.filters}>
            {variations.map(group => (
                <div key={group.variation_type} className={styles.filterItem}>
                    <label>{group.variation_type}</label>
                    <select
                        className={styles.select}
                        value={
                            group.variations.find(v => v.current)?.id || group.variations[0]?.id || ''
                        }
                        onChange={(e) => {
                            const newId = parseInt(e.target.value);
                            if (newId !== productId) {
                                router.push(`/products/${newId}`);
                            }
                        }}
                    >
                        {group.variations.map(variant => (
                            <option key={variant.id} value={variant.id}>
                                {variant.variation_text}
                            </option>
                        ))}
                    </select>
                </div>
            ))}
        </div>
    );
}

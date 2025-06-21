import Image from 'next/image';
import styles from './CategoryPage.module.css';

async function getCategoryData(id: string) {
    const res = await fetch(`http://localhost/api/categories/${id}/products/`, {
        cache: 'no-store',
    });
    return res.json();
}

export default async function CategoryPage({ params }: { params: { id: string } }) {
    const data = await getCategoryData(params.id);

    const { category, products, filters } = data;

    return (
        <div className={styles.page}>
            <aside className={styles.sidebar}>
                <h3>Фильтры</h3>
                {filters?.map((filter: any) => (
                    <div key={filter.id} className={styles.filter}>
                        <p>{filter.name}</p>
                        {filter.values?.map((value: any) => (
                            <label key={value.id}>
                                <input type="checkbox" name={filter.name} value={value.id} />
                                {value.value}
                            </label>
                        ))}
                    </div>
                ))}
            </aside>

            <section className={styles.grid}>
                {products?.map((product: any) => (
                    <div className={styles.card}>
                        <div className={styles.imageWrapper}>
                            <Image
                                src={product.photos?.[0]?.image || '/placeholder.png'}
                                alt={product.name}
                                width={289}
                                height={200}
                                unoptimized
                            />
                        </div>
                        <h4>{product.name}</h4>
                        <p>{parseFloat(product.price) > 0 ? `${product.price} BYN` : 'Цена по запросу'}</p>
                        <button>В корзину</button>
                    </div>
                ))}
            </section>
        </div>
    );
}

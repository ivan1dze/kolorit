import { Metadata } from 'next';
import ProductClient from './ProductClient';

async function getProductData(id: string) {
    const res = await fetch(`https://api.colordrive.by/api/products/${id}/`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Ошибка загрузки товара');
    return res.json();
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    try {
        const product = await getProductData(params.id);
        return {
            title: `${product.name} — купить в Минске | Колорит`,
            description: `Закажите ${product.name} по цене ${product.price} BYN. Быстрая доставка и оригинальный товар в магазине Колорит.`,
            openGraph: {
                title: `${product.name} — Колорит`,
                description: `Оригинальный ${product.name} от производителя. Доступно с доставкой.`,
                images: [
                    {
                        url: product.photos?.[0]?.image || '/placeholder.png',
                        alt: product.name,
                    },
                ],
            },
        };
    } catch {
        return {
            title: 'Товар не найден',
            description: 'Такой товар не существует или недоступен.',
        };
    }
}

export default async function ProductPage({ params }: { params: { id: string } }) {
    const product = await getProductData(params.id);
    return <ProductClient product={product} />;
}

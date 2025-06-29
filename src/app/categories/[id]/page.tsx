import { Metadata } from 'next';
import CategoryPage from './CategoryPage';

async function getCategoryData(id: string) {
    const res = await fetch(`https://api.colordrive.by/api/categories/${id}/products/`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Ошибка загрузки');
    return res.json();
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    const data = await getCategoryData(params.id);

    return {
        title: `${data.category.name} — Каталог | Колорит`,
        description: `Товары из категории ${data.category.name} в магазине Колорит.`,
        openGraph: {
            title: `${data.category.name} — Колорит`,
            description: `Широкий ассортимент товаров из категории ${data.category.name}.`,
            images: [
                {
                    url: data.products?.[0]?.photos?.[0]?.image || '/placeholder.png',
                    alt: data.category.name,
                },
            ],
        },
    };
}

export default async function Page({ params }: { params: { id: string } }) {
    return <CategoryPage params={Promise.resolve(params)} />;
}

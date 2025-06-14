// lib/getCategories.ts
export type Category = {
    id: number;
    external_id: string;
    name: string;
    parent: number | null;
    children: Category[];
};

export async function getCategories(): Promise<Category[]> {
    try {
        const res = await fetch('http://localhost/api/categories/', { cache: 'no-store' });
        if (!res.ok) throw new Error('Ошибка загрузки категорий');
        return await res.json();
    } catch (e) {
        console.error('Fetch error:', e);
        return [];
    }
}

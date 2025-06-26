import ProductClient from './ProductClient';

async function getProductData(id: string) {
    const res = await fetch(`http://localhost/api/products/${id}/`, { cache: 'no-store' });
    return res.json();
}

export default async function ProductPage({ params }: { params: { id: string } }) {
    const product = await getProductData(params.id);
    return <ProductClient product={product} />;
}

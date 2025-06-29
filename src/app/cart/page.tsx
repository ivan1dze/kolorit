import { Metadata } from 'next';
import CartPage from './CartPage';

export const metadata: Metadata = {
    title: 'Корзина — Колорит',
    description: 'Оформите заказ на автокраски, лаки, шпатлёвки и другие товары в интернет-магазине Колорит.',
    openGraph: {
        title: 'Корзина — Колорит',
        description: 'Ваши выбранные товары в интернет-магазине Колорит. Удобное оформление заказа.',
    },
};

export default function Page() {
    return <CartPage />;
}

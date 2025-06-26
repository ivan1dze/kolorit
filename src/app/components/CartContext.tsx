'use client';

import { createContext, useContext, useEffect, useState } from 'react';

interface CartContextType {
    count: number;
    updateCount: () => void;
}

const CartContext = createContext<CartContextType>({
    count: 0,
    updateCount: () => {},
});

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [count, setCount] = useState(0);

    const updateCount = () => {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const total = cart.reduce((sum: number, item: any) => sum + item.quantity, 0);
        setCount(total);
    };

    useEffect(() => {
        updateCount();
        window.addEventListener('cartUpdated', updateCount);
        return () => window.removeEventListener('cartUpdated', updateCount);
    }, []);

    return (
        <CartContext.Provider value={{ count, updateCount }}>
            {children}
        </CartContext.Provider>
    );
};

'use client';

import { useEffect, useState } from 'react';
import styles from './CartPage.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { getContacts } from '@/app/components/lib/getContacts';
import type { Contact } from '@/app/components/types/contact';
import PopularProducts from "@/app/components/PopularCard/PopularProducts";


interface Variation {
    type: string;
    value: string;
}

interface CartItem {
    id: number;
    title: string;
    image: string;
    price: number;
    quantity: number;
    variations?: Variation[];
}

export default function CartPage() {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [deliveryType, setDeliveryType] = useState<'1' | '2' | '3'>('1');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [orderSuccess, setOrderSuccess] = useState(false);
    const [submittedData, setSubmittedData] = useState<any>(null);
    const [contacts, setContacts] = useState<Contact[]>([]);



    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        setCartItems(cart);

        getContacts().then(setContacts);
    }, []);


    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        setCartItems(cart);
    }, []);

    const removeFromCart = (id: number) => {
        const updated = cartItems.filter(item => item.id !== id);
        setCartItems(updated);
        localStorage.setItem('cart', JSON.stringify(updated));
        window.dispatchEvent(new Event('cartUpdated'));
    };


    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const handleOrder = async () => {
        const [firstName, lastName = '', patronymic = ''] = name.trim().split(' ');
        const body: any = {
            first_name: firstName || '—',
            last_name: lastName || '—',
            phone,
            delivery_type: deliveryType,
            items: cartItems.map(item => ({
                product_id: item.id,
                quantity: item.quantity
            }))
        };

        if (deliveryType !== '1') {
            body.delivery_address = address;
        }

        try {
            const res = await fetch('https://api.colordrive.by/api/orders/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            if (!res.ok) throw new Error('Ошибка при оформлении заказа');

            setOrderSuccess(true);
            setSubmittedData({ ...body, patronymic });
            localStorage.removeItem('cart');
        } catch (err) {
            console.error(err);
            alert('Произошла ошибка при отправке заказа');
        }
    };

    if (orderSuccess && submittedData) {
        return (
            <main className={styles.wrapper}>
                <section className={styles.left}>
                    <h2 className={styles.heading}>
                        Скоро с вами свяжутся. Спасибо за заказ!{' '}
                        <span>{cartItems.length} товара</span>
                    </h2>

                    {cartItems.map(item => (
                        <div key={item.id} className={styles.productCard}>
                            <div className={styles.imageBox}>
                                <Image
                                    src={item.image || '/placeholder.png'}
                                    alt={item.title}
                                    width={120}
                                    height={120}
                                    className={styles.productImage}
                                />
                            </div>
                            <div className={styles.cardContent}>
                                <div className={styles.cardTop}>
                                    <div className={styles.title}>{item.title}</div>
                                </div>
                                <div className={styles.attributes}>
                                    {item.variations?.map((v, i) => (
                                        <span key={i}>{v.type}: {v.value}</span>
                                    ))}
                                </div>
                            </div>
                            <div className={styles.priceBlock}>
                                <span className={styles.quantityText}>
                                    {item.quantity > 1 ? `${item.quantity} × ` : ''}
                                </span>
                                <span className={styles.priceText}>
                                    {(item.price * item.quantity).toFixed(2)} BYN
                                </span>
                            </div>
                        </div>
                    ))}
                </section>

                <aside className={styles.right}>
                    <div className={styles.totalBlock}>
                        <div className={styles.totalHeader}>
                            <div className={styles.totalLeft}>
                                <span className={styles.totalLabel}>Итого</span>
                                <span className={styles.totalItems}>{cartItems.length} товара</span>
                            </div>
                            <span className={styles.total}>{total.toFixed(2)} BYN</span>
                        </div>

                        <div className={styles.confirmRight}>

                            <div className={styles.row}><span className={styles.label}>Имя</span><span className={styles.value}>{submittedData.first_name}</span></div>
                            <div className={styles.row}><span className={styles.label}>Фамилия</span><span className={styles.value}>{submittedData.last_name}</span></div>
                            <div className={styles.row}><span className={styles.label}>Номер</span><span className={styles.value}>{submittedData.phone}</span></div>
                            <div className={styles.row}><span className={styles.label}>Отчество</span><span className={styles.value}>{submittedData.patronymic}</span></div>
                            <div className={styles.row}><span className={styles.label}>Способ доставки</span><span className={styles.value}>
    {deliveryType === '1' ? 'Самовывоз' : deliveryType === '2' ? 'Европочта' : 'Белпочта'}
  </span></div>
                            {submittedData.delivery_address && (
                                <div className={styles.address}>
                                    <span className={styles.label}>Адрес</span>
                                    <span className={styles.value}>{submittedData.delivery_address}</span>
                                </div>
                            )}

                            <div className={styles.success}>
                                Заказ создан!
                                <Image src="/components/confirm.svg" alt="✓" width={16} height={16} />
                            </div>
                            <p className={styles.note}>Скоро с вами свяжутся по указанному номеру телефона в рабочее время</p>

                            <p className={styles.sectionTitle}>Режим работы</p>
                            <div className={styles.contactList}>
                                Пн–Вс — с 9:00 до 17:00
                            </div>

                            <p className={styles.sectionTitle}>Прием заказов</p>
                            <div className={styles.contactList}>
                                Пн–Пт — с 9:00 до 17:00
                            </div>

                            <p className={styles.sectionTitle}>Наши телефоны:</p>
                            <div className={styles.contactList}>
                                {contacts.map(contact => (
                                    <div key={contact.id}>
                                        <span>{contact.phone}</span>
                                    </div>
                                ))}
                            </div>

                        </div>

                    </div>
                </aside>
            </main>
        );
    }

    // Обычный вид корзины
    return (
        <>
            <main className={styles.wrapper}>
                <section className={styles.left}>
                    <h2 className={styles.heading}>
                        Корзина <span>{cartItems.length} товара</span>
                    </h2>

                    {cartItems.map(item => (
                        <div key={item.id} className={styles.productCard}>
                            <div className={styles.imageBox}>
                                <Link href={`/products/${item.id}`}>
                                    <Image
                                        src={item.image || '/placeholder.png'}
                                        alt={item.title}
                                        width={120}
                                        height={120}
                                        className={styles.productImage}
                                    />
                                </Link>
                            </div>
                            <div className={styles.cardContent}>
                                <div className={styles.cardTop}>
                                    <Link href={`/products/${item.id}`} className={styles.title}>
                                        {item.title}
                                    </Link>
                                </div>
                                <button
                                    className={styles.removeBtn}
                                    onClick={() => removeFromCart(item.id)}
                                    aria-label="Удалить товар"
                                >
                                    <Image
                                        src="/components/bak.svg"
                                        alt="Удалить"
                                        width={18}
                                        height={18}
                                    />
                                </button>
                                <div className={styles.attributes}>
                                    {item.variations?.map((v, i) => (
                                        <span key={i}>{v.type}: {v.value}</span>
                                    ))}
                                </div>
                            </div>
                            <div className={styles.priceBlock}>
                            <span className={styles.quantityText}>
                                {item.quantity > 1 ? `${item.quantity} х ` : ''}
                            </span>
                                <span className={styles.priceText}>
                                {(item.price * item.quantity).toFixed(2)} BYN
                            </span>
                            </div>
                        </div>
                    ))}
                </section>

                <aside className={styles.right}>
                    <div className={styles.totalBlock}>
                        <div className={styles.totalHeader}>
                            <div className={styles.totalLeft}>
                                <span className={styles.totalLabel}>Итого</span>
                                <span className={styles.totalItems}>{cartItems.length} товара</span>
                            </div>
                            <span className={styles.total}>{total.toFixed(2)} BYN</span>
                        </div>

                        <div className={styles.delivery}>
                            <button className={deliveryType === '1' ? styles.active : ''} onClick={() => setDeliveryType('1')}>Самовывоз</button>
                            <button className={deliveryType === '2' ? styles.active : ''} onClick={() => setDeliveryType('2')}>Европочта</button>
                            <button className={deliveryType === '3' ? styles.active : ''} onClick={() => setDeliveryType('3')}>Белпочта</button>
                        </div>

                        <Link href="/delivery" className={styles.deliveryNote}>
                            Подробнее про способ доставки
                        </Link>


                        <input
                            type="text"
                            placeholder="Ваше ФИО"
                            className={styles.input}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Номер телефона"
                            className={styles.input}
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                        {deliveryType !== '1' && (
                            <input
                                type="text"
                                placeholder="Адрес доставки"
                                className={styles.input}
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        )}
                        <button className={styles.submitBtn} onClick={handleOrder}>Оформить заказ</button>
                        <p className={styles.privacy}>
                            Нажимая на кнопку «Оформить заказ», Вы даете согласие на <a href="/privacy">обработку персональных данных</a>.
                        </p>
                    </div>
                </aside>
            </main>
            <PopularProducts/>
        </>
    );
}

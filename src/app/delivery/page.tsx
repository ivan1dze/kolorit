import styles from './Delivery.module.css';
import ContactCard from "@/app/components/ContactCard/ContactCard";

export default function DeliveryPage() {
    return (
        <main className={styles.page}>
            <h1 className={styles.title}>Доставка и оплата</h1>
            <p className={styles.subtitle}>Получение товара осуществляется тремя способами:</p>

            {/* Самовывоз */}
            <section className={styles.accordion}>
                <input type="checkbox" id="pickup" className={styles.toggle} />
                <label htmlFor="pickup" className={styles.label}>
                    Самовывоз
                    <img src="/components/header/arrow-down2.svg" alt="arrow" className={styles.arrow} />
                </label>
                <div className={styles.content}>
                    <p>При самовывозе оплату можно произвести наличными денежными средствами или картой на месте выдачи товара.<br />
                        До 7 дней. По истечении срока – заказ расформировывается.</p>
                    <p><strong>г. Гомель, ул. Б. Хмельницкого, д. 59, магазин «Колорит».</strong></p>
                    <img src="/images/del-map.png" alt="Карта с адресом" className={styles.map} />
                </div>
            </section>

            {/* Белпочта */}
            <section className={styles.accordion}>
                <input type="checkbox" id="belpost" className={styles.toggle} />
                <label htmlFor="belpost" className={styles.label}>
                    Доставка в пункты выдачи РУП «Белпочта»
                    <img src="/components/header/arrow-down2.svg" alt="arrow" className={styles.arrow} />
                </label>
                <div className={styles.content}>
                    <p><strong>Доставка</strong> осуществляется <strong>наложным платежом</strong> по территории Республики Беларусь.<br />
                        <strong>Оплата</strong> производится на почте при получении.</p>
                    <p>Актуальные тарифы: <a href="https://belpost.by/" target="_blank">https://belpost.by/</a></p>

                    <p><strong>Срок хранения:</strong><br />
                        30 (тридцать) календарных дней в отделении.</p>

                    <p><strong>Сроки доставки:</strong></p>
                    <ul>
                        <li>При наличии товара — до 3-х рабочих дней (не считая дня приёма), зависит от региона.</li>
                        <li>Возможны задержки по независящим от нас причинам.</li>
                        <li>При заказе товара под заказ — сроки согласовываются индивидуально.</li>
                    </ul>
                </div>
            </section>

            {/* Европочта */}
            <section className={styles.accordion}>
                <input type="checkbox" id="europost" className={styles.toggle} />
                <label htmlFor="europost" className={styles.label}>
                    Доставка в пункты выдачи Европочты
                    <img src="/components/header/arrow-down2.svg" alt="arrow" className={styles.arrow} />
                </label>
                <div className={styles.content}>
                    <p><strong>Доставка</strong> осуществляется <strong>наложным платежом</strong> по территории Республики Беларусь.<br />
                        <strong>Оплата</strong> — при получении посылки в отделении.</p>
                    <p>Тарифы Европочты: <a href="https://evropochta.by/services/tariffs/" target="_blank">https://evropochta.by/services/tariffs/</a></p>

                    <p><strong>Срок хранения:</strong><br />
                        30 (тридцать) календарных дней в отделении.<br />
                        Первые 7 дней — бесплатно. С 8 дня начисляется плата по тарифу.</p>

                    <p><strong>Сроки доставки:</strong></p>
                    <ul>
                        <li>При наличии товара — до 3-х рабочих дней, не считая приём.</li>
                        <li>Возможны задержки по независящим от компании причинам.</li>
                        <li>При заказе под заказ — сроки уточняются индивидуально.</li>
                    </ul>
                </div>
            </section>

            {/* Дополнительно */}
            <section className={styles.additional}>
                <h2 className={styles.additionalTitle}>Дополнительно</h2>
                <ul className={styles.list}>
                    <li>Стоимость доставки рассчитывается индивидуально на основе состава заказа и тарифов транспортных компаний.</li>
                    <li>Бесплатная доставка юридическим лицам не предоставляется.</li>
                    <li>Условия могут меняться. Точную информацию сообщит специалист при подтверждении заказа.</li>
                </ul>
            </section>

            <ContactCard/>
        </main>

    );
}

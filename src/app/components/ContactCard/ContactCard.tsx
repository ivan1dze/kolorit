import { getContacts } from '../lib/getContacts';
import styles from './ContactCard.module.css';

const ContactCard = async () => {
    const contacts = await getContacts();

    const phones = contacts.filter(c => c.phone).map(c => c.phone);
    const emailObj = contacts.find(c => c.email);
    const email = emailObj?.email || 'go14b31@yandex.ru';

    return (
        <div className={styles.wrapper}>
            <div className={styles.left}>
                <div className={styles.content}>
                    <h2 className={styles.title}>Магазин Колорит</h2>
                    <p className={styles.org}>Организация ЧТУП «Профавтостиль»</p>

                    <div className={styles.phones}>
                        {phones.map((phone, index) => (
                            <p key={index}>
                                <a href={`tel:${phone?.replace(/\s|\(|\)/g, '')}`}>{phone}</a>
                            </p>
                        ))}
                    </div>

                    <p className={styles.email}>
                        <a href={`mailto:${email}`}>{email}</a>
                    </p>

                    <p className={styles.address}>
                        г. Гомель, ул. Б. Хмельницкого, д.59, каб. 27 <br />
                        (магазин "Колорит")
                    </p>
                </div>

                <hr className={styles.line} />

                <div className={`${styles.content} ${styles.schedule}`}>
                    <div>
                        <p className={styles.scheduleTitle}>Режим работы</p>
                        <p>Пн–Вс — с 9:00 до 17:00</p>
                    </div>
                    <div>
                        <p className={styles.scheduleTitle}>Прием заказов</p>
                        <p>Пн–Пт — с 9:00 до 17:00</p>
                    </div>
                </div>
            </div>

            <div className={styles.right}>
                <iframe
                    src="https://yandex.ru/map-widget/v1/?um=constructor%3Ab4ca9170ed1af82f8a2adc8a3179aeedd956f76956513c9f025ac39ab4dad25a&amp;source=constructor"
                    width="100%" height="100%" frameBorder="0"></iframe>
            </div>
        </div>
    );
};

export default ContactCard;

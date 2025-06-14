import { Contact } from '../types/contact';

export async function getContacts(): Promise<Contact[]> {
    try {
        const res = await fetch('http://localhost/api/contacts/', {
            cache: 'no-store',
        });

        if (!res.ok) throw new Error('Failed to fetch contacts');

        return await res.json();
    } catch (e) {
        console.error('Ошибка загрузки контактов:', e);
        return [];
    }
}

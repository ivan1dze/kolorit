import { getContacts } from '../lib/getContacts';
import ContactCardClient from './СontactCardClient';

export default async function ContactCardServer() {
    const contacts = await getContacts();
    return <ContactCardClient contacts={contacts} />;
}

import PromoBlock from "@/app/components/main/PromoBlock";
import styles from "./page.module.css"
import ContactCard from "@/app/components/ContactCard/ContactCard";

export default function Home() {
    return (
        <main>
            <PromoBlock/>
            <ContactCard/>
        </main>
    );
}

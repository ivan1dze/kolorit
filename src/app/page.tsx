import PromoBlock from "@/app/components/main/PromoBlock";
import styles from "./page.module.css"
import OntactCardClient from "@/app/components/ContactCard/СontactCardClient";
import PopularProducts from "@/app/components/PopularCard/PopularProducts";

export default function Home() {
    return (
        <main>
            <PromoBlock/>
            <PopularProducts/>
        </main>
    );
}

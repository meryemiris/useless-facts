import Link from "next/link";
import FactBasket from "./FactBasket";
import { FcFolder, FcHome } from "react-icons/fc";
import Language from "./Language";

import styles from "./Navbar.module.css";

import { Fact } from "@/pages";

type Props = {
	factBasket: Fact[];
	setFactBasket: React.Dispatch<React.SetStateAction<Fact[]>>;
	language: string;
	setLanguage: (language: string) => void;
};

const Navbar: React.FC<Props> = ({
	factBasket,
	setFactBasket,
	language,
	setLanguage,
}) => {
	return (
		<nav className={styles.navbar}>
			<FactBasket facts={factBasket} setFactBasket={setFactBasket} />

			<Link className={styles.goPage} href="/saved">
				<FcFolder className={styles.icon} />
			</Link>
			<Link href="/" className={styles.goPage}>
				<FcHome className={styles.icon} />
			</Link>

			<Language language={language} setLanguage={setLanguage} />
		</nav>
	);
};

export default Navbar;

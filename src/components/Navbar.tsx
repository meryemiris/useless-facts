import Link from "next/link";
import FactBasket from "./FactBasket";
import { FcFolder, FcHome } from "react-icons/fc";
import Language from "./Language";

import styles from "./Navbar.module.css";

const Navbar = () => {
	return (
		<nav className={styles.navbar}>
			<FactBasket />

			<Link className={styles.goPage} href="/saved">
				<FcFolder className={styles.icon} />
			</Link>
			<Link href="/" className={styles.goPage}>
				<FcHome className={styles.icon} />
			</Link>

			<Language />
		</nav>
	);
};

export default Navbar;

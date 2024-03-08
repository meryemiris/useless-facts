import Link from "next/link";
import FactBasket from "./FactBasket";
import { FcFolder, FcHome } from "react-icons/fc";
import Language from "./Language";

import styles from "./Navbar.module.css";
import { useContext, useState } from "react";
import FactContext from "@/lib/FactContext";

const Navbar = () => {
	const { activePage, setActivePage } = useContext(FactContext);
	return (
		<nav className={styles.navbar}>
			<FactBasket />

			<button
				onClick={() => setActivePage("saved")}
				className={`${styles.goPage} ${
					activePage === "saved" ? styles.onPage : ""
				}`}
			>
				<Link href="/saved">
					<FcFolder className={styles.icon} />
				</Link>
			</button>
			<button
				onClick={() => setActivePage("home")}
				className={`${styles.goPage} ${
					activePage === "home" ? styles.onPage : ""
				}`}
			>
				<Link href="/">
					<FcHome className={styles.icon} />
				</Link>
			</button>

			<Language />
		</nav>
	);
};

export default Navbar;

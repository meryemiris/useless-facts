import { useContext, useState } from "react";

import styles from "./Navbar.module.css";

import { supabase } from "@/lib/supabase";

import Link from "next/link";
import FactBasket from "./FactBasket";
import Language from "./Language";

import { FcFolder, FcHome } from "react-icons/fc";
import { IoLogOut } from "react-icons/io5";
import FactContext from "@/lib/FactContext";

async function signOut() {
	const { error } = await supabase.auth.signOut();
}

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
			<button onClick={signOut} className={styles.goPage}>
				<IoLogOut style={{ color: " #ED2939" }} className={styles.icon} />
			</button>
		</nav>
	);
};

export default Navbar;

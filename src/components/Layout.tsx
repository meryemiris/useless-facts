import Navbar from "./Navbar";
import styles from "./Layout.module.css";
import { Fact } from "@/pages";

type Props = {
	factBasket: Fact[];
	setFactBasket: React.Dispatch<React.SetStateAction<Fact[]>>;
	language: string;
	setLanguage: (language: string) => void;
	children: React.ReactNode;
};

const Layout: React.FC<Props> = ({
	language,
	setLanguage,
	factBasket,
	setFactBasket,
	children,
}) => {
	return (
		<div className={styles.layout}>
			<Navbar
				language={language}
				setLanguage={setLanguage}
				factBasket={factBasket}
				setFactBasket={setFactBasket}
			/>
			<main className={styles.main}>{children}</main>
		</div>
	);
};

export default Layout;

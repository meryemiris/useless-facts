import Navbar from "./Navbar";
import styles from "./Layout.module.css";
import { Fact } from "@/pages";
import TodayFact from "./TodayFact";

type Props = {
	factBasket: Fact[];
	setFactBasket: React.Dispatch<React.SetStateAction<Fact[]>>;
	language: string;
	setLanguage: (language: string) => void;
	getTodayFact: () => void;
	todayfact: Fact[];
	onBasket: (fact: Fact) => void;
	children: React.ReactNode;
};

const Layout: React.FC<Props> = ({
	language,
	setLanguage,
	factBasket,
	setFactBasket,
	children,
	todayfact,
	getTodayFact,
	onBasket,
}) => {
	return (
		<div className={styles.layout}>
			<TodayFact
				todayfact={todayfact}
				getTodayFact={getTodayFact}
				onBasket={onBasket}
			/>
			<main className={styles.main}>{children}</main>

			<Navbar
				language={language}
				setLanguage={setLanguage}
				factBasket={factBasket}
				setFactBasket={setFactBasket}
			/>
		</div>
	);
};

export default Layout;

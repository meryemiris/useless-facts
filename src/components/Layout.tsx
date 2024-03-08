import Navbar from "./Navbar";
import styles from "./Layout.module.css";
import { Fact } from "@/pages";
import TodayFact from "./TodayFact";

type Props = {
	getTodayFact: () => void;
	onBasket: (fact: Fact) => void;
	children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children, getTodayFact, onBasket }) => {
	return (
		<div className={styles.layout}>
			<TodayFact getTodayFact={getTodayFact} onBasket={onBasket} />
			<main className={styles.main}>{children}</main>

			<Navbar />
		</div>
	);
};

export default Layout;

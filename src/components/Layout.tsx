import Navbar from "./Navbar";
import styles from "./Layout.module.css";

type Props = {
	children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
	return (
		<div className={styles.layout}>
			<main className={styles.main}>{children}</main>
			<Navbar />
		</div>
	);
};

export default Layout;

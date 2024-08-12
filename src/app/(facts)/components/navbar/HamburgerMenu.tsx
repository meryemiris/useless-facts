import Link from "next/link";
import styles from "./HamburgerMenu.module.css";

import ArchiveLink from "./ArchiveLink";
import FactBasket from "./FactBasket";
import HomeLink from "./HomeLink";
import Language from "./Language";
import Logout from "./Logout";
import Banner from "./Banner";

export default function HamburgerMenu() {
  return (
    <div className={styles.container}>
      <nav className={styles.navbar}>
        <div className={styles.navbarContainer}>
          <input type="checkbox" id="hamburgerMenu" />
          <label htmlFor="hamburgerMenu" className={styles.label}></label>
          <div className={styles.hamburgerLines}>
            <span className={`${styles.line} ${styles.line1}`}></span>
            <span className={`${styles.line} ${styles.line2}`}></span>
            <span className={`${styles.line} ${styles.line3}`}></span>
            <Banner />
          </div>

          <section className={styles.menuItems}>
            <HomeLink />

            <FactBasket />

            <ArchiveLink />

            <Language />

            <Logout />
          </section>
          <Link href="/" className={styles.logo}>
            Useless<span>Facts</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}

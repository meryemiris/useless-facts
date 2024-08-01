import styles from "./Navbar.module.css";
import HomeLink from "./HomeLink";
import FactBasket from "./FactBasket";
import ArchiveLink from "./ArchiveLink";
import Language from "./Language";
import Logout from "./Logout";

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <HomeLink />
      <FactBasket />
      <ArchiveLink />
      <Language />
      <Logout />
    </nav>
  );
}

export default Navbar;

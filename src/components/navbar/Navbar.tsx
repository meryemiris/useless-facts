import Link from "next/link";

import styles from "./Navbar.module.css";

import { supabase } from "@/lib/supabase";
import { useFactContext } from "@/lib/FactContext";

import FactBasket from "../fact/FactBasket";
import Language from "../lang/Language";

import { FcFolder, FcHome } from "react-icons/fc";
import { IoLogOut } from "react-icons/io5";

import { toast } from "sonner";

async function signOut() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    toast.error("Unable to sign out at the moment. Please try again later.");
  }
}

const Navbar = () => {
  const { activePage, setActivePage } = useFactContext();

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
        <IoLogOut className={styles.logoutIcon} />
      </button>
    </nav>
  );
};

export default Navbar;

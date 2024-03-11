import Link from "next/link";
import { useRouter } from "next/router";

import styles from "./Navbar.module.css";

import { supabase } from "@/lib/supabase";

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
  const router = useRouter();
  return (
    <nav className={styles.navbar}>
      <FactBasket />

      <button
        className={`${styles.goPage} ${
          router.pathname === "/saved" ? styles.onPage : ""
        }`}
      >
        <Link href="/saved">
          <FcFolder className={styles.icon} />
        </Link>
      </button>
      <button
        className={`${styles.goPage} ${
          router.pathname === "/" ? styles.onPage : ""
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

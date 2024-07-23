import Link from "next/link";
import { useRouter } from "next/router";

import styles from "./Navbar.module.css";

import { supabase } from "@/lib/supabase";

import FactBasket from "../fact/FactBasket";
import Language from "../lang/Language";

import {
  IoArchive,
  IoArchiveOutline,
  IoHomeOutline,
  IoHomeSharp,
} from "react-icons/io5";
import { IoMdLogOut } from "react-icons/io";

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
      <Link className={styles.navButton} href="/">
        {router.pathname === "/" ? (
          <IoHomeSharp className={styles.icon} />
        ) : (
          <IoHomeOutline className={styles.icon} />
        )}
        Home
      </Link>
      <FactBasket />

      <Link className={styles.navButton} href="/saved">
        {router.pathname === "/saved" ? (
          <IoArchive className={styles.icon} />
        ) : (
          <IoArchiveOutline className={styles.icon} />
        )}
        Archive
      </Link>

      <Language />
      <button onClick={signOut} className={styles.logoutButton}>
        <IoMdLogOut className={styles.icon} />
        Logout
      </button>
    </nav>
  );
};

export default Navbar;

"use client";
import Link from "next/link";
import styles from "./Navbar.module.css";

import FactBasket from "./FactBasket";
import Language from "./Language";

import {
  IoArchive,
  IoArchiveOutline,
  IoHomeOutline,
  IoHomeSharp,
} from "react-icons/io5";
import { IoMdLogOut } from "react-icons/io";

import { toast } from "sonner";
import { usePathname } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const supabase = createClient();
  const router = useRouter();
  const pathname = usePathname();

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      toast.error("Unable to sign out at the moment. Please try again later.");
    } else {
      toast.success("Successfully signed out.");
      router.push("/login"); // Redirect to login page after sign out
    }
  };

  return (
    <nav className={styles.navbar}>
      <Link className={styles.navButton} href="/">
        {pathname === "/" ? (
          <IoHomeSharp className={styles.icon} />
        ) : (
          <IoHomeOutline className={styles.icon} />
        )}
        Home
      </Link>
      <FactBasket />

      <Link className={styles.navButton} href="/saved">
        {pathname === "/saved" ? (
          <IoArchive className={styles.icon} />
        ) : (
          <IoArchiveOutline className={styles.icon} />
        )}
        Archive
      </Link>

      <Language />
      <button onClick={handleSignOut} className={styles.navButton}>
        <IoMdLogOut className={styles.icon} />
        Logout
      </button>
    </nav>
  );
};

export default Navbar;

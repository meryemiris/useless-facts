"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoHomeOutline, IoHomeSharp } from "react-icons/io5";

import styles from "./HamburgerMenu.module.css";

export default function HomeLink() {
  const pathname = usePathname();
  return (
    <Link className={styles.navButton} href="/">
      {pathname === "/" ? (
        <IoHomeSharp className={styles.icon} />
      ) : (
        <IoHomeOutline className={styles.icon} />
      )}
      Home
    </Link>
  );
}

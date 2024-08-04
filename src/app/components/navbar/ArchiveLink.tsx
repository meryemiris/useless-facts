"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Navbar.module.css";
import { IoArchiveOutline, IoArchive } from "react-icons/io5";

export default function ArchiveLink() {
  const pathname = usePathname();
  return (
    <Link className={styles.navButton} href="/saved">
      {pathname === "/saved" ? (
        <IoArchive className={styles.icon} />
      ) : (
        <IoArchiveOutline className={styles.icon} />
      )}
      Archive
    </Link>
  );
}

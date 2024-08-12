"use client";

import { useFactContext } from "@/utils/FactContext";
import styles from "./HamburgerMenu.module.css";

export default function Banner() {
  const { factBasket } = useFactContext();
  return factBasket.length > 0 && <span className={styles.banner}></span>;
}

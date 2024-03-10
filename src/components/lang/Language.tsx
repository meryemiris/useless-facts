import { useCallback, useRef, useState } from "react";

import Image from "next/image";

import styles from "./Language.module.css";

import { useFactContext } from "@/lib/FactContext";
import useClickOutside from "@/lib/useClickOutside";

const deutschImg = "/de.svg";
const englishImg = "/en.svg";

const Language = () => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { language, setLanguage } = useFactContext();

  const handleClickOutside = useCallback(() => setIsMenuOpen(false), []);

  useClickOutside(menuRef, handleClickOutside, isMenuOpen);

  return (
    <div className={`${styles.langMenu} ${styles.showLeft}`}>
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className={styles.langButton}
      >
        <Image
          className={styles.langImg}
          src={language === "en" ? englishImg : deutschImg}
          alt="Deutsch"
          width={40}
          height={40}
        />
      </button>
      <div
        ref={menuRef}
        id="dropdown"
        className={`${styles.dropdown} ${isMenuOpen ? styles.show : ""}`}
      >
        <button
          onClick={() => {
            setLanguage("en");
            setIsMenuOpen(false);
          }}
        >
          <Image src={englishImg} alt="English" width={20} height={20} />
          English
        </button>
        <button
          onClick={() => {
            setLanguage("de");
            setIsMenuOpen(false);
          }}
        >
          <Image src={deutschImg} alt="Deutsch" width={20} height={20} />
          Deutsch
        </button>
      </div>
    </div>
  );
};

export default Language;

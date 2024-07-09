import { useCallback, useRef, useState } from "react";

import Image from "next/image";

import styles from "./Language.module.css";

import { useFactContext } from "@/lib/FactContext";
import useClickOutside from "@/lib/useClickOutside";
import { IoEarthOutline } from "react-icons/io5";

// import englishImg from "../../../public/en.svg";
// import deutschImg from "../../../public/de.svg";

const englishImg = "/en.svg";
const deutschImg = "/de.svg";

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
        {isMenuOpen ? (
          <IoEarthOutline className={styles.langImg} />
        ) : (
          <IoEarthOutline className={styles.langImg} />
        )}
        Language
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
          <Image
            src={englishImg}
            alt="British flag"
            width={20}
            height={20}
            priority
          />
          English
        </button>
        <button
          onClick={() => {
            setLanguage("de");
            setIsMenuOpen(false);
          }}
        >
          <Image src={deutschImg} alt="Germany flag" width={20} height={20} />
          Deutsch
        </button>
      </div>
    </div>
  );
};

export default Language;

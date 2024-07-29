import { useCallback, useRef, useState } from "react";

import Image from "next/image";

import styles from "./Language.module.css";

import { useFactContext } from "@/app/lib/FactContext";
import useClickOutside from "@/app/lib/useClickOutside";
import { IoEarthOutline } from "react-icons/io5";
import Dropdown from "./Dropdown";

const englishImg = "/en.svg";
const deutschImg = "/de.svg";

const Language = () => {
  const { language, setLanguage } = useFactContext();

  const languageRef = useRef<HTMLDivElement>(null);

  const icon = <IoEarthOutline size={32} />;
  const label = language === "en" ? "English" : "German";

  // todo: close dropdown when lang selected

  return (
    <Dropdown label={label} icon={icon} dropdownRef={languageRef}>
      <button
        onClick={() => {
          setLanguage("en");
        }}
        className={styles.languageButton}
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
        }}
        className={styles.languageButton}
      >
        <Image src={deutschImg} alt="Germany flag" width={20} height={20} />
        Deutsch
      </button>
    </Dropdown>
  );
};

export default Language;

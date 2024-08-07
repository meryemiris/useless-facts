"use client";
import { useState } from "react";
import Image from "next/image";

import styles from "./Language.module.css";

import { toast } from "sonner";

import { IoEarthOutline } from "react-icons/io5";
import { useFactContext } from "@/utils/FactContext";

import englishImg from "@/public/en.svg";
import germanImg from "@/public/de.svg";
import Dropdown from "@/ui/Dropdown";

const Language = () => {
  const { language, setLanguage } = useFactContext();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const icon = <IoEarthOutline size={24} />;
  const label = language === "en" ? "English" : "German";

  function handleChangeLanguage(lang: "en" | "de") {
    setLanguage(lang);
    setIsDropdownOpen(false);
    toast.success("Language changed!");
  }

  return (
    <Dropdown
      label={label}
      icon={icon}
      bannerCount={0}
      isOpen={isDropdownOpen}
      setIsOpen={setIsDropdownOpen}
    >
      <button
        aria-label="Change language to English"
        onClick={() => handleChangeLanguage("en")}
        className={styles.languageButton}
      >
        <Image
          src={englishImg}
          alt="British flag"
          className={styles.flag}
          priority
        />
        English
      </button>
      <button
        aria-label="Change language to German"
        onClick={() => handleChangeLanguage("de")}
        className={styles.languageButton}
      >
        <Image className={styles.flag} src={germanImg} alt="Germany flag" />
        German
      </button>
    </Dropdown>
  );
};

export default Language;

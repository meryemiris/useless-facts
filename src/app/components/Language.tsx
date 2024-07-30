import { useState } from "react";
import { toast } from "sonner";

import Image from "next/image";

import styles from "./Language.module.css";

import { useFactContext } from "@/app/lib/FactContext";
import { IoEarthOutline } from "react-icons/io5";
import Dropdown from "../ui/Dropdown";

const englishImg = "/en.svg";
const deutschImg = "/de.svg";

const Language = () => {
  const { language, setLanguage } = useFactContext();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const icon = <IoEarthOutline size={32} />;
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
        onClick={() => handleChangeLanguage("en")}
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
        onClick={() => handleChangeLanguage("de")}
        className={styles.languageButton}
      >
        <Image src={deutschImg} alt="Germany flag" width={20} height={20} />
        Deutsch
      </button>
    </Dropdown>
  );
};

export default Language;

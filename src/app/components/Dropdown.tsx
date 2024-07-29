"use client";

import { useCallback, useState } from "react";

import styles from "./Dropdown.module.css";
import useClickOutside from "../lib/useClickOutside";

type Props = {
  children: React.ReactNode;
  label: string;
  icon: React.ReactNode;
  dropdownRef: React.RefObject<HTMLDivElement>;
  bannerCount: number;
};
const Dropdown: React.FC<Props> = ({
  children,
  label,
  icon,
  dropdownRef,
  bannerCount = 0,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const handleClickOutside = useCallback(() => setIsDropdownOpen(false), []);

  useClickOutside(dropdownRef, handleClickOutside, isDropdownOpen);

  return (
    <div className={`${styles.menu} ${styles.showRight}`}>
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className={styles.dropdownButton}
      >
        {bannerCount > 0 && (
          <span className={styles.bannerCount}>
            {bannerCount < 10 ? bannerCount : "9+"}
          </span>
        )}
        <span> {icon}</span>
        <span> {label}</span>
      </button>
      <div
        ref={dropdownRef}
        id="dropdown"
        className={`${styles.dropdown} ${isDropdownOpen ? styles.show : ""}`}
      >
        {children}
      </div>
    </div>
  );
};

export default Dropdown;

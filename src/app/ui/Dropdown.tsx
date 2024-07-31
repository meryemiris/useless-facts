import { useCallback, useRef } from "react";

import styles from "./Dropdown.module.css";
import useClickOutside from "@/hooks/useClickOutside";

type Props = {
  children: React.ReactNode;
  label: string;
  icon: React.ReactNode;
  bannerCount: number;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const Dropdown: React.FC<Props> = ({
  children,
  label,
  icon,
  bannerCount = 0,
  isOpen,
  setIsOpen,
}) => {
  const handleClickOutside = useCallback(() => setIsOpen(false), [setIsOpen]);
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, handleClickOutside, isOpen);

  return (
    <div className={`${styles.menu} ${styles.showRight}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
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
        ref={ref}
        id="dropdown"
        className={`${styles.dropdown} ${isOpen ? styles.show : ""}`}
      >
        {children}
      </div>
    </div>
  );
};

export default Dropdown;

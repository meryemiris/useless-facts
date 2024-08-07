import { useCallback, useRef } from "react";

import styles from "./Modal.module.css";
import useClickOutside from "@/hooks/useClickOutside";

type Props = {
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Modal: React.FC<Props> = ({ children, isOpen, setIsOpen }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback(() => setIsOpen(false), [setIsOpen]);

  useClickOutside(modalRef, handleClickOutside, isOpen);

  return (
    <>
      {isOpen && (
        <div className={styles.modal}>
          <div ref={modalRef} className={styles.modalContent}>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;

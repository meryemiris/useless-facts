import { IoClose } from "react-icons/io5";
import styles from "./CardWithButtons.module.css";
import Image from "next/image";

type Props = {
  isHeader: boolean;
  onClose?: () => void;
  content?: string;
  primaryLabel: string;
  primaryIcon: React.ReactNode;
  secondaryLabel: string;
  secondaryIcon: React.ReactNode;
  onPrimaryAction?: () => void;
  onSecondaryAction?: () => void;
};

const CardWithButtons: React.FC<Props> = ({
  isHeader,
  onClose,
  content,
  primaryLabel,
  primaryIcon,
  secondaryLabel,
  secondaryIcon,
  onPrimaryAction,
  onSecondaryAction,
}) => {
  return (
    <div className={styles.card}>
      {isHeader && (
        <header className={styles.header}>
          <Image
            className={styles.image}
            src="fact.svg"
            width={50}
            height={50}
            alt="Card Image"
          />

          <button onClick={onClose} className={styles.close}>
            <span>
              <IoClose size={32} />
            </span>
          </button>
        </header>
      )}
      <main className={styles.fact}>
        <p>{content}</p>
      </main>
      <footer className={styles.footer}>
        <button className={styles.primaryButton} onClick={onPrimaryAction}>
          <span> {primaryLabel}</span>
          <span className={styles.icon}>{primaryIcon}</span>
        </button>
        <button className={styles.secondaryButton} onClick={onSecondaryAction}>
          <span> {secondaryLabel}</span>
          <span className={styles.icon}>{secondaryIcon}</span>
        </button>
      </footer>
    </div>
  );
};

export default CardWithButtons;

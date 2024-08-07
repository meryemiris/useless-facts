import Image from "next/image";
import styles from "./PressEffectButton.module.css";
import Loading from "./LoadingSpinner";

import owlImg from "@/public/readingOwl.png";

type Props = {
  onPress: () => void;
  label: string;
  loading: boolean;
};

const PressEffectButton: React.FC<Props> = ({ onPress, label, loading }) => {
  return (
    <button aria-label={label} className={styles.button} onClick={onPress}>
      <Image
        className={styles.image}
        src={owlImg}
        alt="owl reading book"
        priority
      />
      {loading ? <Loading color="orange" size="md" /> : label}
    </button>
  );
};

export default PressEffectButton;

import Image from "next/image";
import styles from "./PressEffectButton.module.css";
import Loading from "./LoadingSpinner";

type Props = {
  onPress: () => void;
  label: string;
  loading: boolean;
};

const PressEffectButton: React.FC<Props> = ({ onPress, label, loading }) => {
  return (
    <button className={styles.button} onClick={onPress}>
      <Image
        className={styles.owlImg}
        src={"/readingOwl.png"}
        alt="owl reading book"
        width={100}
        height={100}
        priority
      />
      {loading ? <Loading color="orange" size="md" /> : label}
    </button>
  );
};

export default PressEffectButton;

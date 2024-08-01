import Image from "next/image";
import styles from "./SlideEffectButton.module.css";

import bulbImg from "@/public/lightbulb.svg";

type Props = {
  onPress: () => void;
  firstLabel: string;
  secondLabel: string;
};

const SlideEffectButton: React.FC<Props> = ({
  onPress,
  firstLabel,
  secondLabel,
}) => {
  return (
    <button
      aria-label={`${firstLabel} ${secondLabel} `}
      className={styles.button}
      onClick={onPress}
    >
      <Image className={styles.image} src={bulbImg} alt="button's lighbulb" />
      <span className={styles.secondLabel}>{secondLabel}</span>
      <span className={styles.firstLabel}>{firstLabel}</span>
    </button>
  );
};

export default SlideEffectButton;

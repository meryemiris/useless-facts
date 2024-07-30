import Image from "next/image";
import styles from "./SlideEffectButton.module.css";

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
    <button className={styles.button} onClick={onPress}>
      <Image
        className={styles.image}
        src="lightbulb.svg"
        width={40}
        height={40}
        alt="button's lighbulb"
      />
      <span className={styles.secondLabel}>{secondLabel}</span>
      <span className={styles.firstLabel}>{firstLabel}</span>
    </button>
  );
};

export default SlideEffectButton;

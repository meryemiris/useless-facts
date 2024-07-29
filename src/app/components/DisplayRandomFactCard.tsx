import { IoArchive, IoArchiveOutline } from "react-icons/io5";
import styles from "./DisplayRandomFactCard.module.css";
import { useFactContext } from "@/app/lib/FactContext";
import { GrCaretNext } from "react-icons/gr";
import { Fact } from "@/app/lib/types";

type Props = {
  onFetchFact: () => void;
  randomFact?: Fact;
};

const DisplayRandomFactCard: React.FC<Props> = ({
  onFetchFact,
  randomFact,
}) => {
  const { addToBasket, removeFromBasket, factBasket } = useFactContext();

  const isInBasket = factBasket?.find((fact) => fact.id === randomFact?.id);

  return (
    <div className={styles.card}>
      <button
        className={`${styles.addBasket} ${isInBasket ? styles.inBasket : ""}`}
        onClick={() => {
          randomFact && isInBasket
            ? removeFromBasket(randomFact?.id)
            : addToBasket(randomFact as Fact);
        }}
      >
        {isInBasket ? <IoArchive /> : <IoArchiveOutline />}
      </button>
      <span key={randomFact?.id} className={styles.fact}>
        {randomFact?.text}
      </span>

      <button
        onClick={() => {
          onFetchFact();
        }}
        className={styles.nextButton}
      >
        Go Next <GrCaretNext className={styles.nextIcon} />
      </button>
    </div>
  );
};

export default DisplayRandomFactCard;

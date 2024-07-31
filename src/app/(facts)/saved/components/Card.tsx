import AnimatedBinButton from "@/app/ui/AnimatedBinButton";
import Image from "next/image";
import styles from "./SavedFacts.module.css";
import { Fact } from "@/app/lib/types";

type CardProps = {
  facts: Fact[];
  onDelete: (id: number | string) => void;
};

const Card: React.FC<CardProps> = ({ facts, onDelete }) => {
  return (
    <>
      {facts.length > 0 ? (
        <ul className={styles.facts}>
          {facts.map((fact) => (
            <li className={styles.fact} key={fact.id}>
              <Image
                className={styles.modalImg}
                src="/lightbulb.svg" // Fixed the path for image source
                width={40}
                height={40}
                alt="fact modal image"
              />
              <p>{fact.text}</p>
              <AnimatedBinButton factId={+fact.id} onDelete={onDelete} />
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.noFacts}>
          Start saving some facts! You have no saved facts yet.
        </p>
      )}
    </>
  );
};

export default Card;

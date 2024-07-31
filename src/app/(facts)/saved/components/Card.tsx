import Image from "next/image";

import styles from "./SavedFacts.module.css";

import { Fact } from "@/utils/types";
import Loading from "@/app/ui/LoadingSpinner";
import AnimatedBinButton from "@/app/ui/AnimatedBinButton";

type CardProps = {
  loading: boolean;
  facts: Fact[];
  onDelete: (id: number | string) => void;
};

const Card: React.FC<CardProps> = ({ facts, onDelete, loading }) => {
  return (
    <>
      {loading ? (
        <Loading color="orange" size="sm" />
      ) : (
        <>
          {facts.length > 0 ? (
            <ul className={styles.facts}>
              {facts.map((fact) => (
                <li className={styles.fact} key={fact.id}>
                  <Image
                    className={styles.modalImg}
                    src="/lightbulb.svg"
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
            <p className={styles.noFacts}>No facts found.</p>
          )}
        </>
      )}
    </>
  );
};

export default Card;

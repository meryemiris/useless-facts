import { useState } from "react";

import Image from "next/image";

import styles from "./RandomFact.module.css";

import { fetchFact } from "@/lib/api";

import { Fact } from "@/pages";

import { useFactContext } from "@/lib/FactContext";

import { GrCaretNext } from "react-icons/gr";
import { FaBookmark } from "react-icons/fa";
import { CiBookmark } from "react-icons/ci";

const RandomFact = () => {
  const [randomFact, setRandomFact] = useState<Fact>();
  const { language, addToBasket, factBasket } = useFactContext();

  const fetchRandomFact = async () => {
    // todo handle loading and error
    const data = await fetchFact({
      factType: "random",
      language: language,
    });

    setRandomFact(data);
  };

  const isInBasket = !!factBasket.find((fact) => fact.id === randomFact?.id);

  return (
    <div className={styles.scrollable}>
      {randomFact ? (
        <div className={styles.card}>
          <button
            className={`${styles.saveIcon} ${isInBasket ? styles.inBasket : ""}`}
            onClick={() => {
              addToBasket(randomFact);
            }}
          >
            {isInBasket ? <FaBookmark /> : <CiBookmark />}
          </button>
          <span key={randomFact.id} className={styles.fact}>
            {randomFact.text}
          </span>

          <button
            onClick={() => {
              fetchRandomFact();
            }}
            className={styles.nextButton}
          >
            Go Next <GrCaretNext className={styles.nextIcon} />
          </button>
        </div>
      ) : (
        <button className={styles.button} onClick={fetchRandomFact}>
          <Image
            className={styles.owlImg}
            src="/randomFact.svg"
            alt="owl reading book"
            width={120}
            height={120}
          />
          Random Fact
        </button>
      )}
    </div>
  );
};

export default RandomFact;

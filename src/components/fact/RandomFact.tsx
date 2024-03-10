import { useState } from "react";

import Image from "next/image";

import styles from "./RandomFact.module.css";

import { fetchFact } from "@/lib/api";
import { Fact } from "@/pages";
import { useFactContext } from "@/lib/FactContext";

import Loading from "../utils/Loading";

import { GrCaretNext } from "react-icons/gr";
import { IoBasket, IoBasketOutline } from "react-icons/io5";

import { toast } from "sonner";

const RandomFact = () => {
  const [randomFact, setRandomFact] = useState<Fact>();
  const { language, addToBasket, removeFromBasket, factBasket } =
    useFactContext();

  const [isLoading, setIsLoading] = useState(false);

  const fetchRandomFact = async () => {
    try {
      setIsLoading(true);
      const data = await fetchFact({
        factType: "random",
        language: language,
      });

      setRandomFact(data);
    } catch (error) {
      console.log(error);
      toast.error(
        "Oops! Something didn't quite work out. Don't worry, we're on it!",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const isInBasket = !!factBasket.find((fact) => fact.id === randomFact?.id);

  return (
    <div className={styles.scrollable}>
      {randomFact ? (
        <div className={styles.card}>
          <button
            className={`${styles.addBasket} ${isInBasket ? styles.inBasket : ""}`}
            onClick={() => {
              isInBasket
                ? removeFromBasket(randomFact.id)
                : addToBasket(randomFact);
            }}
          >
            {isInBasket ? <IoBasket /> : <IoBasketOutline />}
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
            src="/readingOwl.png"
            alt="owl reading book"
            width={120}
            height={120}
          />
          {isLoading ? <Loading size="md" /> : "Random Fact"}
        </button>
      )}
    </div>
  );
};

export default RandomFact;

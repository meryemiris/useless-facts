import { useState } from "react";

import Image from "next/image";

import styles from "./RandomFact.module.css";

import { fetchFact } from "@/lib/api";
import { Fact } from "@/pages";
import { useFactContext } from "@/lib/FactContext";

import { GrCaretNext } from "react-icons/gr";
import { IoBasket, IoBasketOutline } from "react-icons/io5";
import Alert, { alertMessage } from "../utils/Alert";
import Loading from "../utils/Loading";

const RandomFact = () => {
  const [randomFact, setRandomFact] = useState<Fact>();
  const { language, addToBasket, removeFromBasket, factBasket } =
    useFactContext();

  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState<alertMessage | null>(null);

  const showAlert = (type: string, title: string, message: string) => {
    setAlert({ title, message, type });
    setTimeout(() => setAlert(null), 3000);
  };

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
      showAlert("error", "Error", "Something went wrong");
    } finally {
      // setIsLoading(false);
    }
  };

  const isInBasket = !!factBasket.find((fact) => fact.id === randomFact?.id);

  return (
    <>
      {alert && (
        <Alert
          title={alert.title}
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert(null)}
        />
      )}
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
    </>
  );
};

export default RandomFact;

import { useCallback, useEffect, useRef, useState } from "react";

import Image from "next/image";

import styles from "./TodayFact.module.css";

import { fetchFact } from "@/lib/api";
import { useFactContext } from "@/lib/FactContext";

import { Fact } from "@/components/types";

import { IoArchive, IoArchiveOutline } from "react-icons/io5";
import useClickOutside from "@/lib/useClickOutside";

import { toast } from "sonner";

import factImg from "../../../../public/fact.svg";

const TodayFact = () => {
  const { factBasket, addToBasket, removeFromBasket, language } =
    useFactContext();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [todayFact, setTodayFact] = useState<Fact>();

  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback(() => setIsModalOpen(false), []);

  useClickOutside(modalRef, handleClickOutside, isModalOpen);

  useEffect(() => {
    fetchFact({
      factType: "today",
      language: language,
    })
      .then((data) => {
        setTodayFact(data);
      })
      .catch((err) => {
        toast.error(
          "Oops! Something didn't quite work out. Don't worry, we're on it!",
        );
      });
  }, [language]);

  const isInBasket = factBasket?.find((fact) => fact.id === todayFact?.id);

  return (
    <>
      <button className={styles.button} onClick={() => setIsModalOpen(true)}>
        <Image
          className={styles.image}
          src={factImg}
          width={40}
          height={40}
          alt="button's lighbulb"
        />
        <span className={styles.factText}>fact</span>
        <span className={styles.todayText}>today</span>
      </button>

      {isModalOpen && (
        <div className={styles.modal}>
          <div ref={modalRef} className={styles.modalContent}>
            <span
              className={styles.close}
              onClick={() => setIsModalOpen(false)}
            >
              &times;
            </span>
            <Image
              className={styles.modalImg}
              src={factImg}
              width={50}
              height={50}
              alt="modal's lightbulb"
            />

            {todayFact ? (
              <>
                <p key={todayFact.id}>{todayFact.text}</p>

                <button
                  className={`${styles.addButton} ${isInBasket ? styles.inBasket : ""}`}
                  onClick={() => {
                    isInBasket
                      ? removeFromBasket(todayFact.id)
                      : addToBasket(todayFact);
                  }}
                >
                  {isInBasket ? <IoArchive /> : <IoArchiveOutline />}
                </button>
              </>
            ) : null}
          </div>
        </div>
      )}
    </>
  );
};

export default TodayFact;

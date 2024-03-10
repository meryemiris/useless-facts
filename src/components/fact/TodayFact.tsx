import { useEffect, useRef, useState } from "react";

import Image from "next/image";

import styles from "./TodayFact.module.css";

import { fetchFact } from "@/lib/api";
import { useFactContext } from "@/lib/FactContext";

import { Fact } from "@/pages";

import { IoBasket, IoBasketOutline } from "react-icons/io5";

const TodayFact = () => {
  const { factBasket, addToBasket, removeFromBasket, language } =
    useFactContext();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [todayFact, setTodayFact] = useState<Fact>();

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchFact({
      factType: "today",
      language: language,
    }).then((data) => {
      setTodayFact(data);
    });
  }, [language]);

  useEffect(() => {
    const handleClickOutsideModal = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setIsModalOpen(false);
      }
    };

    const handleClick = (e: MouseEvent) => {
      handleClickOutsideModal(e);
    };

    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  const isInBasket = !!factBasket.find((fact) => fact.id === todayFact?.id);

  return (
    <>
      <button
        className={styles.button}
        onClick={() => {
          openModal();
        }}
      >
        <Image
          className={styles.image}
          src={"/fact.svg"}
          width={30}
          height={30}
          alt="fact"
        />
        <span className={styles.fact}>fact</span>
        <span className={styles.daily}>today</span>
      </button>

      {isModalOpen && (
        <div className={styles.modal}>
          <div ref={modalRef} className={styles.modalContent}>
            <span className={styles.close} onClick={closeModal}>
              &times;
            </span>
            <Image
              className={styles.modalImg}
              src={"/fact.svg"}
              width={40}
              height={40}
              alt={"fact modal image"}
            />
            {/* add spinner for loading  */}
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
                  {isInBasket ? <IoBasket /> : <IoBasketOutline />}
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

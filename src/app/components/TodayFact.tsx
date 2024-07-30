"use client";

import { useEffect, useState } from "react";

import Image from "next/image";

import styles from "./TodayFact.module.css";

import { fetchFact } from "@/app/lib/api";
import { useFactContext } from "@/app/lib/FactContext";

import { IoBag, IoBagOutline, IoClose } from "react-icons/io5";

import { toast } from "sonner";
import { Fact } from "@/app/lib/types";
import CardWithButtons from "../ui/CardWithButtons";
import Modal from "../ui/Modal";
import SlideEffectButton from "../ui/SlideEffectButton";

const TodayFact = () => {
  const { factBasket, addToBasket, removeFromBasket, language } =
    useFactContext();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [todayFact, setTodayFact] = useState<Fact>();

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
      <SlideEffectButton
        onPress={() => setIsModalOpen(true)}
        firstLabel="Today"
        secondLabel="Fact"
      />
      <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
        {todayFact && (
          <CardWithButtons
            isHeader
            onClose={() => setIsModalOpen(false)}
            key={todayFact.id}
            onPrimaryAction={() => {
              todayFact && isInBasket
                ? removeFromBasket(todayFact.id)
                : addToBasket(todayFact);
            }}
            onSecondaryAction={() => setIsModalOpen(false)}
            primaryIcon={isInBasket ? <IoBag /> : <IoBagOutline />}
            primaryLabel={isInBasket ? "Drop from Basket" : "Add to Basket"}
            secondaryIcon={<IoClose />}
            secondaryLabel="Close"
            content={todayFact.text}
          />
        )}
      </Modal>
    </>
  );
};

export default TodayFact;

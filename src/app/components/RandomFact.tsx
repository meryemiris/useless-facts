"use client";

import { useState } from "react";

import { fetchFact } from "@/app/lib/api";
import { useFactContext } from "@/app/lib/FactContext";

import { toast } from "sonner";

import { Fact } from "../lib/types";
import PressEffectButton from "../ui/PressEffectButton";
import { IoBag, IoBagOutline } from "react-icons/io5";
import { GrCaretNext } from "react-icons/gr";
import CardWithButtons from "../ui/CardWithButtons";

const RandomFact = () => {
  const { language } = useFactContext();

  const [randomFact, setRandomFact] = useState<Fact>();
  const [isLoading, setIsLoading] = useState(false);

  const { addToBasket, removeFromBasket, factBasket } = useFactContext();

  const isInBasket = factBasket?.find((fact) => fact.id === randomFact?.id);

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

  return (
    <>
      {randomFact ? (
        <CardWithButtons
          key={randomFact.id}
          isHeader={false}
          onPrimaryAction={() => {
            randomFact && isInBasket
              ? removeFromBasket(randomFact?.id)
              : addToBasket(randomFact as Fact);
          }}
          onSecondaryAction={fetchRandomFact}
          primaryIcon={isInBasket ? <IoBag /> : <IoBagOutline />}
          primaryLabel={isInBasket ? "Drop from Basket" : "Add to Basket"}
          secondaryIcon={<GrCaretNext />}
          secondaryLabel="Go Next"
          content={randomFact?.text}
        />
      ) : (
        <PressEffectButton
          onPress={fetchRandomFact}
          label="Random Fact"
          loading={isLoading}
        />
      )}
    </>
  );
};

export default RandomFact;

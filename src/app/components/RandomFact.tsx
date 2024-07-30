"use client";

import { useState } from "react";

import { fetchFact } from "@/app/lib/api";
import { useFactContext } from "@/app/lib/FactContext";

import { toast } from "sonner";

import DisplayRandomFactCard from "./DisplayRandomFactCard";

import { Fact } from "../lib/types";
import PressEffectButton from "../ui/PressEffectButton";

const RandomFact = () => {
  const { language } = useFactContext();

  const [randomFact, setRandomFact] = useState<Fact>();
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

  return (
    <>
      {randomFact ? (
        <DisplayRandomFactCard
          onFetchFact={fetchRandomFact}
          randomFact={randomFact}
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

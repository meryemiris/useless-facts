import { useState } from "react";

import { fetchFact } from "@/lib/api";
import { Fact } from "@/components/types";
import { useFactContext } from "@/lib/FactContext";

import { toast } from "sonner";

import DisplayRandomFactCard from "./DisplayRandomFactCard";
import InitRandomFactButton from "./InitRandomFactButton";

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
        <InitRandomFactButton
          onFetchFact={fetchRandomFact}
          loading={isLoading}
        />
      )}
    </>
  );
};

export default RandomFact;

// https://kentcdodds.com/blog/how-to-use-react-context-effectively

"use client";
import React, { createContext, useState } from "react";

import { Fact } from "@/components/types";

export type FactContextType = {
  language: "de" | "en";
  setLanguage: (language: "en" | "de") => void;
  factBasket: Fact[];
  addToBasket: (fact: Fact) => void;
  removeFromBasket: (factId: string) => void;
  clearBasket: () => void;
};

const FactContext = createContext<FactContextType>({} as FactContextType);

export const FactProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [factBasket, setFactBasket] = useState<Fact[]>([]);
  const [language, setLanguage] = useState<"de" | "en">("en");

  const addToBasket = (fact: Fact) => {
    setFactBasket((prev) => {
      if (prev.find((f) => f.id === fact.id)) {
        return prev;
      }

      return [...prev, fact];
    });
  };

  const removeFromBasket = (factId: string) => {
    setFactBasket((prev) => prev.filter((f) => f.id !== factId));
  };

  const clearBasket = () => {
    setFactBasket([]);
  };

  const value = {
    factBasket,
    addToBasket,
    removeFromBasket,
    clearBasket,
    language,
    setLanguage,
  };

  return <FactContext.Provider value={value}>{children}</FactContext.Provider>;
};

export function useFactContext() {
  const context = React.useContext(FactContext);

  if (context === undefined) {
    throw new Error("useFactContext must be used within a FactContextProvider");
  }

  return context;
}

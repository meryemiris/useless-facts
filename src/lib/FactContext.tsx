// https://kentcdodds.com/blog/how-to-use-react-context-effectively
import { Fact } from "@/pages";
import React, { createContext, useState } from "react";

export type FactContextType = {
  language: "de" | "en";
  setLanguage: (language: "en" | "de") => void;
  factBasket: Fact[];
  setFactBasket: (fact: Fact[] | ((prev: Fact[]) => Fact[])) => void;
  activePage: "home" | "saved";
  setActivePage: (activePage: "home" | "saved") => void;
};

const FactContext = createContext<FactContextType>({} as FactContextType);

export const FactProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [factBasket, setFactBasket] = useState<Fact[]>([]);
  const [language, setLanguage] = useState<"de" | "en">("en");
  const [activePage, setActivePage] = useState<"home" | "saved">("home");

  const value = {
    factBasket,
    setFactBasket,
    language,
    setLanguage,
    activePage,
    setActivePage,
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

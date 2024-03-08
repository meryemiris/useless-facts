import { Fact } from "@/pages";
import { createContext } from "react";

const FactContext = createContext({
	language: "today" || "random",
	setLanguage: (language: string) => {},

	factBasket: [] as Fact[],
	setFactBasket: (fact: Fact[] | ((prev: Fact[]) => Fact[])) => {},

	todayFact: [] as Fact[],
	setTodayFact: (fact: Fact[] | ((prev: Fact[]) => Fact[])) => {},

	activePage: "saved" || "home",
	setActivePage: (activePage: "saved" | "home") => {},
});

export default FactContext;

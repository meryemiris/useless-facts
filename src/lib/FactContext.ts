import { Fact } from "@/pages";
import { createContext } from "react";

const FactContext = createContext({
	language: "today" || "random",
	setLanguage: (language: string) => {},

	factBasket: [] as Fact[],
	setFactBasket: (fact: Fact[] | ((prev: Fact[]) => Fact[])) => {},

	activePage: "home" || "saved",
	setActivePage: (activePage: "home" | "saved") => {},
});

export default FactContext;

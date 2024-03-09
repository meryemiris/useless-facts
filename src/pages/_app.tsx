import AuthContext from "@/lib/AuthContext";
import FactContext from "@/lib/FactContext";
import { supabase } from "@/lib/supabase";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useState } from "react";
import { Fact } from ".";

export default function App({ Component, pageProps }: AppProps) {
	const [userId, setUserId] = useState("");
	const [isLoggedIn, setIsLoggedIn] = useState(true);

	const [todayFact, setTodayFact] = useState<Fact[]>([]);
	const [factBasket, setFactBasket] = useState<Fact[]>([]);
	const [language, setLanguage] = useState<string>("en");

	supabase.auth.onAuthStateChange((event, session) => {
		setIsLoggedIn(!!session);
		setUserId(session?.user?.id || "");
	});

	return (
		<AuthContext.Provider
			value={{ userId, setUserId, isLoggedIn, setIsLoggedIn }}
		>
			<FactContext.Provider
				value={{
					language,
					setLanguage,
					factBasket,
					setFactBasket,
					todayFact,
					setTodayFact,
				}}
			>
				<Component {...pageProps} />
			</FactContext.Provider>
		</AuthContext.Provider>
	);
}

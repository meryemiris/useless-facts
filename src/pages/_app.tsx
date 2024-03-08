import AuthContext from "@/lib/AuthContext";
import { supabase } from "@/lib/supabase";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
	const [userId, setUserId] = useState("");
	const [isLoggedIn, setIsLoggedIn] = useState(true);

	supabase.auth.onAuthStateChange((event, session) => {
		setIsLoggedIn(!!session);
		setUserId(session?.user?.id || "");
	});

	return (
		<AuthContext.Provider
			value={{ userId, setUserId, isLoggedIn, setIsLoggedIn }}
		>
			<Component {...pageProps} />
		</AuthContext.Provider>
	);
}

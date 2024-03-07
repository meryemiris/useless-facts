import Head from "next/head";
import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";

import TodayFact from "@/components/TodayFact";
import RandomFact from "@/components/RandomFact";
import styles from "@/styles/Home.module.css";

export type Fact = {
	id: string;
	text: string;
};

type FactType = "random" | "today";

import Image from "next/image";
import AuthContext from "@/lib/AuthContext";
import Link from "next/link";
import FactBasket from "@/components/FactBasket";
import Alert, { alertMessage } from "@/components/Alert";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Language from "@/components/Language";

export default function HomePage() {
	const router = useRouter();
	const [randomfact, setRandomFacts] = useState<Fact[]>([]);
	const [todayfact, setTodayFacts] = useState<Fact[]>([]);
	const [language, setLanguage] = useState<string>("en");

	const [factBasket, setFactBasket] = useState<Fact[]>([]);

	const [alert, setAlert] = useState<alertMessage | null>(null);

	const { userId, setUserId, isLoggedIn, setIsLoggedIn } =
		useContext(AuthContext);

	const showAlert = (type: string, title: string, message: string) => {
		setAlert({ title, message, type });
		setTimeout(() => setAlert(null), 5000);
	};

	const getFact = async ({ factType = "random" }: { factType?: FactType }) => {
		try {
			const response = await axios.get(
				`https://uselessfacts.jsph.pl/${factType}.json?language=${language}`
			);

			if (factType === "random") {
				setRandomFacts([response.data]);
			} else {
				setTodayFacts([response.data]);
			}
			console.log(response.data);
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	const getTodayFact = () => {
		getFact({ factType: "today" });
	};

	const getRandomFact = () => {
		getFact({ factType: "random" });
	};

	const handleAddToBasket = (fact: Fact) => {
		if (factBasket.includes(fact)) {
			showAlert(
				"warning",
				"Uh-oh!",
				"This fact is already in your basket! Please choose another one."
			);

			return;
		}
		setFactBasket((prev) => [...prev, fact]);
	};

	const handleRemoveFromBasket = (id: string) => {
		setFactBasket((prev) => [...prev.filter((fact) => fact.id !== id)]);
	};

	return (
		<>
			<Head>
				<title>Teklifim Gelsin Task</title>
				<meta name="description" content="Random Fact Viewer" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			{isLoggedIn ? (
				<>
					{alert && (
						<Alert
							title={alert.title}
							message={alert.message}
							type={alert.type}
							onClose={() => setAlert(null)}
						/>
					)}
					<header className={styles.banner}>
						<Link href="/saved">Go Saved</Link>
						<FactBasket
							facts={factBasket}
							setFactBasket={setFactBasket}
							onRemove={handleRemoveFromBasket}
						/>
						<TodayFact
							todayfact={todayfact}
							getTodayFact={getTodayFact}
							onBasket={handleAddToBasket}
						/>

						<Language language={language} setLanguage={setLanguage} />
					</header>
					<main className={styles.main}>
						<RandomFact
							randomfact={randomfact}
							getRandomFact={getRandomFact}
							onBasket={handleAddToBasket}
						/>
					</main>
				</>
			) : (
				<div>
					You are not logged in. Please login to continue.{" "}
					<Link href="/login">Login</Link>
				</div>
			)}
		</>
	);
}

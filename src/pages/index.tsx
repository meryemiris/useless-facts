import axios from "axios";

import { useContext, useEffect, useState } from "react";

import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/navigation";

import AuthContext from "@/lib/AuthContext";

import styles from "@/styles/Home.module.css";

import Alert, { alertMessage } from "@/components/Alert";
import TodayFact from "@/components/TodayFact";
import RandomFact from "@/components/RandomFact";
import FactBasket from "@/components/FactBasket";
import Language from "@/components/Language";

export type Fact = {
	id: string;
	text: string;
};

type FactType = "random" | "today";

export default function HomePage() {
	const router = useRouter();

	const [randomfact, setRandomFact] = useState<Fact[]>([]);
	const [todayfact, setTodayFact] = useState<Fact[]>([]);
	const [factBasket, setFactBasket] = useState<Fact[]>([]);

	const [language, setLanguage] = useState<string>("en");
	const [alert, setAlert] = useState<alertMessage | null>(null);

	const { isLoggedIn } = useContext(AuthContext);

	const showAlert = (type: string, title: string, message: string) => {
		setAlert({ title, message, type });
		setTimeout(() => setAlert(null), 5000);
	};

	useEffect(() => {
		isLoggedIn ? false : router.push("/login");
	}, [isLoggedIn, router]);

	const getFact = async ({ factType = "random" }: { factType?: FactType }) => {
		try {
			const response = await axios.get(
				`https://uselessfacts.jsph.pl/${factType}.json?language=${language}`
			);

			if (factType === "random") {
				setRandomFact([response.data]);
			} else {
				setTodayFact([response.data]);
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

	return (
		<>
			<Head>
				<title>Teklifim Gelsin Task</title>
				<meta name="description" content="Random Fact Viewer" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			{isLoggedIn && (
				<>
					{alert && (
						<Alert
							title={alert.title}
							message={alert.message}
							type={alert.type}
							onClose={() => setAlert(null)}
						/>
					)}
					<nav className={styles.banner}>
						<Link href="/saved">Go Saved</Link>
						<FactBasket facts={factBasket} setFactBasket={setFactBasket} />
						<TodayFact
							todayfact={todayfact}
							getTodayFact={getTodayFact}
							onBasket={handleAddToBasket}
						/>

						<Language language={language} setLanguage={setLanguage} />
					</nav>
					<main className={styles.main}>
						<RandomFact
							randomfact={randomfact}
							getRandomFact={getRandomFact}
							onBasket={handleAddToBasket}
						/>
					</main>
				</>
			)}
		</>
	);
}

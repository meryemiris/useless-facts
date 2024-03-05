import Head from "next/head";
import { useState } from "react";
import axios from "axios";
import RandomFact from "@/components/randomFact";
import TodayFact from "@/components/todayFact";

export type Fact = {
	id: string;
	text: string;
};

type FactType = "random" | "today";

export default function Home() {
	const [randomfact, setRandomFacts] = useState<Fact[]>([]);
	const [todayfact, setTodayFacts] = useState<Fact[]>([]);
	const [language, setLanguage] = useState<string>("en");

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
	return (
		<>
			<Head>
				<title>Teklifim Gelsin Task</title>
				<meta name="description" content="Random Fact Viewer" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main>
				<select
					onChange={(e) => setLanguage(e.target.value)}
					defaultValue={language}
				>
					<option value="en">English</option>
					<option value="de">Deutsch</option>
				</select>

				<RandomFact randomfact={randomfact} getRandomFact={getRandomFact} />

				<TodayFact todayfact={todayfact} getTodayFact={getTodayFact} />
			</main>
		</>
	);
}

import Head from "next/head";
import { useState } from "react";

type Fact = {
	id: string;
	text: string;
};

export default function Home() {
	const [facts, setFacts] = useState<Fact[]>([]);

	const axios = require("axios");

	const getRandomFact = async () => {
		try {
			const response = await axios.get(
				"https://uselessfacts.jsph.pl/random.json?language=en"
			);
			setFacts([...facts, response.data]);
		} catch (error) {
			console.error(error);
		}
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
				<button onClick={getRandomFact}>Get Random Fact</button>
				<ul>
					{facts.map((fact) => (
						<li key={fact.id}>{fact.text}</li>
					))}
				</ul>
			</main>
		</>
	);
}

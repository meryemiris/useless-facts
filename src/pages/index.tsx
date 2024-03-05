import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

import TodayFact from "@/components/TodayFact";
import RandomFact from "@/components/RandomFact";
import styles from "@/styles/Home.module.css";

export type Fact = {
	id: string;
	text: string;
};

type FactType = "random" | "today";

import { FcFolder } from "react-icons/fc";
import Image from "next/image";

export default function HomePage() {
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

	const dropdownRef = useRef<HTMLDivElement>(null);

	const handleToggleDropdown = () => {
		setDropdownVisible(!dropdownVisible);
	};

	const [dropdownVisible, setDropdownVisible] = useState(false);

	const deutschImg = "/de.svg";
	const englishImg = "/en.svg";

	useEffect(() => {
		const handleClickOutsideDropdown = (e: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(e.target as Node)
			) {
				setDropdownVisible(false);
			}
		};

		const handleClick = (e: MouseEvent) => {
			handleClickOutsideDropdown(e);
		};

		document.addEventListener("mousedown", handleClick);

		return () => {
			document.removeEventListener("mousedown", handleClick);
		};
	}, []);

	return (
		<>
			<Head>
				<title>Teklifim Gelsin Task</title>
				<meta name="description" content="Random Fact Viewer" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<header className={styles.banner}>
				<button className={styles.button}>
					<FcFolder /> Saved Facts
				</button>
				<TodayFact todayfact={todayfact} getTodayFact={getTodayFact} />

				<div className={`${styles.langMenu} ${styles.showLeft}`}>
					<button onClick={handleToggleDropdown} className={styles.langButton}>
						<Image
							className={styles.langImg}
							src={language === "en" ? englishImg : deutschImg}
							alt="Deutsch"
							width={50}
							height={50}
						/>
					</button>
					<div
						ref={dropdownRef}
						id="dropdown"
						className={`${styles.dropdown} ${dropdownVisible ? styles.show : ""}
        }`}
					>
						<button
							onClick={() => {
								setLanguage("en");
								setDropdownVisible(false);
							}}
						>
							<Image src={englishImg} alt="English" width={20} height={20} />
							English
						</button>
						<button
							onClick={() => {
								setLanguage("de");
								setDropdownVisible(false);
							}}
						>
							<Image src={deutschImg} alt="Deutsch" width={20} height={20} />
							Deutsch
						</button>
					</div>
				</div>
			</header>
			<main className={styles.main}>
				<RandomFact randomfact={randomfact} getRandomFact={getRandomFact} />
			</main>
		</>
	);
}

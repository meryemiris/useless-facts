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

	const dropdownRef = useRef<HTMLDivElement>(null);

	const handleToggleDropdown = () => {
		setDropdownVisible(!dropdownVisible);
	};

	const [dropdownVisible, setDropdownVisible] = useState(false);

	const deutschImg = "/de.svg";
	const englishImg = "/en.svg";

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

						<div className={`${styles.langMenu} ${styles.showLeft}`}>
							<button
								onClick={handleToggleDropdown}
								className={styles.langButton}
							>
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
								className={`${styles.dropdown} ${
									dropdownVisible ? styles.show : ""
								}
    }`}
							>
								<button
									onClick={() => {
										setLanguage("en");
										setDropdownVisible(false);
									}}
								>
									<Image
										src={englishImg}
										alt="English"
										width={20}
										height={20}
									/>
									English
								</button>
								<button
									onClick={() => {
										setLanguage("de");
										setDropdownVisible(false);
									}}
								>
									<Image
										src={deutschImg}
										alt="Deutsch"
										width={20}
										height={20}
									/>
									Deutsch
								</button>
							</div>
						</div>
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

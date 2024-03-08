import { useState } from "react";

import styles from "./RandomFact.module.css";

import { Fact } from "@/pages";

import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";
import { GrCaretNext } from "react-icons/gr";
import { FaBookmark } from "react-icons/fa";
import { CiBookmark } from "react-icons/ci";
import Image from "next/image";

type RandomFactProps = {
	randomfact: Fact[];
	getRandomFact: () => void;
	onBasket: (fact: Fact) => void;
};

const RandomFact: React.FC<RandomFactProps> = ({
	randomfact,
	getRandomFact,
	onBasket,
}) => {
	const [isSaved, setIsSaved] = useState(false);
	return (
		<>
			{randomfact.length > 0 ? (
				<div className={styles.card}>
					<button
						className={`${styles.saveIcon} ${isSaved ? styles.saved : ""}`}
						onClick={() => {
							onBasket(randomfact[0]);
							setIsSaved(true);
						}}
					>
						{isSaved ? <FaBookmark /> : <CiBookmark />}
					</button>
					{randomfact.map((fact) => (
						<span key={fact.id} className={styles.fact}>
							{fact.text}
						</span>
					))}

					<button
						onClick={() => {
							getRandomFact();
							setIsSaved(false);
						}}
						className={styles.nextButton}
					>
						Go Next <GrCaretNext className={styles.nextIcon} />
					</button>
				</div>
			) : (
				<button className={styles.button} onClick={getRandomFact}>
					<Image
						className={styles.owlImg}
						src="/randomFact.svg"
						alt="owl reading book"
						width={120}
						height={120}
					/>
					Random Fact
				</button>
			)}
		</>
	);
};

export default RandomFact;

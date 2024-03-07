import { useState } from "react";

import styles from "./RandomFact.module.css";

import { Fact } from "@/pages";

import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";
import { GrCaretNext } from "react-icons/gr";

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
	const [clicked, setClicked] = useState(false);
	return (
		<>
			{randomfact.length > 0 ? (
				<div className={styles.card}>
					<button
						className={`${styles.saveIcon} ${clicked ? styles.clicked : ""}`}
						onClick={() => {
							onBasket(randomfact[0]);
							setClicked(true);
						}}
					>
						<svg
							viewBox="0 0 384 512"
							height="1em"
							xmlns="http://www.w3.org/2000/svg"
							fill="currentColor"
						>
							<path d="M0 48C0 21.5 21.5 0 48 0l0 48V441.4l130.1-92.9c8.3-6 19.6-6 27.9 0L336 441.4V48H48V0H336c26.5 0 48 21.5 48 48V488c0 9-5 17.2-13 21.3s-17.6 3.4-24.9-1.8L192 397.5 37.9 507.5c-7.3 5.2-16.9 5.9-24.9 1.8S0 497 0 488V48z"></path>
						</svg>
					</button>
					{randomfact.map((fact) => (
						<span key={fact.id} className={styles.fact}>
							{fact.text}
						</span>
					))}

					<button
						onClick={() => {
							getRandomFact();
							setClicked(false);
						}}
						className={styles.nextButton}
					>
						Go Next <GrCaretNext className={styles.nextIcon} />
					</button>
				</div>
			) : (
				<button className={styles.button} onClick={getRandomFact}>
					<GiPerspectiveDiceSixFacesRandom />
					Random Fact
				</button>
			)}
		</>
	);
};

export default RandomFact;

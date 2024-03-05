import { Fact } from "@/pages";

import styles from "./RandomFact.module.css";

import { GiPerspectiveDiceSixFacesRandom, GiSaveArrow } from "react-icons/gi";
import { GrCaretNext } from "react-icons/gr";

type RandomFactProps = {
	randomfact: Fact[];
	getRandomFact: () => void;
};

const RandomFact: React.FC<RandomFactProps> = ({
	randomfact,
	getRandomFact,
}) => {
	return (
		<>
			{randomfact.length > 0 ? (
				<div className={styles.card}>
					{randomfact.map((fact) => (
						<span key={fact.id} className={styles.fact}>
							{fact.text}
						</span>
					))}
					<GiSaveArrow className={styles.saveIcon} />
					<button onClick={getRandomFact} className={styles.nextButton}>
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

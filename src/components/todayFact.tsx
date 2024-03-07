import { useState } from "react";

import styles from "./TodayFact.module.css";

import { Fact } from "@/pages";

import { FcPlanner } from "react-icons/fc";

type TodayFactProps = {
	getTodayFact: () => void;
	todayfact: Fact[];
	onBasket: (fact: Fact) => void;
};

const TodayFact: React.FC<TodayFactProps> = ({
	getTodayFact,
	todayfact,
	onBasket,
}) => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = () => {
		setIsModalOpen(true);
	};
	const closeModal = () => {
		setIsModalOpen(false);
	};

	return (
		<>
			<button
				onClick={() => {
					getTodayFact();
					openModal();
				}}
				className={styles.button}
			>
				<FcPlanner /> Fact of the Day
			</button>

			{isModalOpen && (
				<div className={styles.modal}>
					<div className={styles.modalContent}>
						<span className={styles.close} onClick={closeModal}>
							&times;
						</span>
						{todayfact.length > 0 &&
							todayfact.map((fact) => <p key={fact.id}>{fact.text}</p>)}
						<button onClick={() => onBasket(todayfact[0])}>
							Add to basket
						</button>
					</div>
				</div>
			)}
		</>
	);
};

export default TodayFact;

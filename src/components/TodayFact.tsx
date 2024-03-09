import { useContext, useEffect, useRef, useState } from "react";

import styles from "./TodayFact.module.css";

import { Fact } from "@/pages";

import Image from "next/image";

import { CiBookmark } from "react-icons/ci";
import { FaBookmark } from "react-icons/fa";
import FactContext from "@/lib/FactContext";

type TodayFactProps = {
	getTodayFact: () => void;
	onBasket: (fact: Fact) => void;
};

const TodayFact: React.FC<TodayFactProps> = ({ getTodayFact, onBasket }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = () => {
		setIsModalOpen(true);
	};
	const closeModal = () => {
		setIsModalOpen(false);
	};

	const [isSaved, setIsSaved] = useState(false);

	const modalRef = useRef<HTMLDivElement>(null);

	const { todayFact } = useContext(FactContext);

	useEffect(() => {
		const handleClickOutsideModal = (e: MouseEvent) => {
			if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
				setIsModalOpen(false);
			}
		};

		const handleClick = (e: MouseEvent) => {
			handleClickOutsideModal(e);
		};

		document.addEventListener("mousedown", handleClick);

		return () => {
			document.removeEventListener("mousedown", handleClick);
		};
	}, []);

	return (
		<>
			<button
				className={styles.button}
				onClick={() => {
					getTodayFact();
					openModal();
				}}
			>
				<Image
					className={styles.image}
					src={"/fact.svg"}
					width={30}
					height={30}
					alt="fact"
				/>
				<span className={styles.fact}>fact</span>
				<span className={styles.daily}>today</span>
			</button>

			{isModalOpen && (
				<div className={styles.modal}>
					<div ref={modalRef} className={styles.modalContent}>
						<span className={styles.close} onClick={closeModal}>
							&times;
						</span>
						<Image
							className={styles.modalImg}
							src={"/fact.svg"}
							width={40}
							height={40}
							alt={"fact modal image"}
						/>
						{todayFact.length > 0 &&
							todayFact.map((fact: Fact) => <p key={fact.id}>{fact.text}</p>)}
						<button
							className={`${styles.addButton} ${isSaved ? styles.saved : ""}`}
							onClick={() => {
								setIsSaved(true);
								onBasket(todayFact[0]);
							}}
						>
							{isSaved ? <FaBookmark /> : <CiBookmark />}
						</button>
					</div>
				</div>
			)}
		</>
	);
};

export default TodayFact;

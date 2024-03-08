import { useEffect, useRef, useState } from "react";

import styles from "./TodayFact.module.css";

import { Fact } from "@/pages";

import Image from "next/image";

import { CiBookmark } from "react-icons/ci";
import { FaBookmark } from "react-icons/fa";

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

	const [isSaved, setIsSaved] = useState(false);

	const modalRef = useRef<HTMLDivElement>(null);

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
						{todayfact.length > 0 &&
							todayfact.map((fact) => <p key={fact.id}>{fact.text}</p>)}
						<button
							className={`${styles.addButton} ${isSaved ? styles.saved : ""}`}
							onClick={() => {
								setIsSaved(true);
								onBasket(todayfact[0]);
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
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "./Language.module.css";

type Props = {
	language: string;
	setLanguage: (language: string) => void;
};

const Language: React.FC<Props> = ({ language, setLanguage }) => {
	const dropdownRef = useRef<HTMLDivElement>(null);
	const [dropdownVisible, setDropdownVisible] = useState(false);

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

	const handleToggleDropdown = () => {
		setDropdownVisible(!dropdownVisible);
	};

	const deutschImg = "/de.svg";
	const englishImg = "/en.svg";
	return (
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
	);
};

export default Language;

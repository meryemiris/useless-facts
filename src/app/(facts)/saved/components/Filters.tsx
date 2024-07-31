import { Language } from "@/app/lib/types";
import styles from "./SavedFacts.module.css";

type FilterProps = {
  activeLanguage: Language | "all";
  onFilter: (language: Language | "all") => void;
};

const Filter: React.FC<FilterProps> = ({ activeLanguage, onFilter }) => {
  const languages = [
    { name: "All", code: "all" },
    { name: "English", code: "en" },
    { name: "German", code: "de" },
  ];
  return (
    <>
      <div className={styles.filter}>
        {languages.map((language) => (
          <button
            key={language.code}
            className={
              language.code === activeLanguage
                ? styles.filterButtonActive
                : styles.filterButton
            }
            onClick={() => onFilter(language.code as Language | "all")}
          >
            {language.name}
          </button>
        ))}
      </div>
    </>
  );
};

export default Filter;

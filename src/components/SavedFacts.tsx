import { useEffect, useState } from "react";

import { supabase } from "@/lib/supabase";

import styles from "./SavedFacts.module.css";

import { useAuthContext } from "@/lib/AuthContext";
import { useFactContext } from "@/lib/FactContext";

type SavedFacts = {
  id: number;
  user_id: string;
  content: string;
}[];

const SavedFacts = () => {
  const { userId } = useAuthContext();
  const { setActivePage } = useFactContext();

  const [savedFacts, setSavedFacts] = useState<SavedFacts>([]);

  useEffect(() => {
    if (userId) {
      const getSavedFacts = async () => {
        try {
          let { data, error } = await supabase
            .from("facts")
            .select("*")
            .eq("user_id", userId);

          setSavedFacts(data as SavedFacts);
        } catch (error) {
          console.log(error);
        }
      };
      getSavedFacts();
    }
    setActivePage("saved");
  }, [userId, setActivePage]);

  const handleDeleteFact = async (id: number) => {
    try {
      const { data, error } = await supabase
        .from("facts")
        .delete()
        .eq("id", id);

      setSavedFacts((prev) => prev.filter((fact) => fact.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ul className={styles.facts}>
      {savedFacts.length > 0 ? (
        savedFacts?.map((fact) => (
          <li className={styles.fact} key={fact.id}>
            <p> {fact.content}</p>
            <button
              className={styles.binButton}
              onClick={() => handleDeleteFact(fact.id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 39 7"
                className={styles.binTop}
              >
                <line
                  strokeWidth="4"
                  stroke="white"
                  y2="5"
                  x2="39"
                  y1="5"
                ></line>
                <line
                  strokeWidth="3"
                  stroke="white"
                  y2="1.5"
                  x2="26.0357"
                  y1="1.5"
                  x1="12"
                ></line>
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 33 39"
                className={styles.binBottom}
              >
                <mask fill="white" id="path-1-inside-1_8_19">
                  <path d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z"></path>
                </mask>
                <path
                  mask="url(#path-1-inside-1_8_19)"
                  fill="white"
                  d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z"
                ></path>
                <path strokeWidth="4" stroke="white" d="M12 6L12 29"></path>
                <path strokeWidth="4" stroke="white" d="M21 6V29"></path>
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 89 80"
                className={styles.garbage}
              >
                <path
                  fill="white"
                  d="M20.5 10.5L37.5 15.5L42.5 11.5L51.5 12.5L68.75 0L72 11.5L79.5 12.5H88.5L87 22L68.75 31.5L75.5066 25L86 26L87 35.5L77.5 48L70.5 49.5L80 50L77.5 71.5L63.5 58.5L53.5 68.5L65.5 70.5L45.5 73L35.5 79.5L28 67L16 63L12 51.5L0 48L16 25L22.5 17L20.5 10.5Z"
                ></path>
              </svg>
            </button>
          </li>
        ))
      ) : (
        <p>Start saving interesting facts! You have not saved any facts yet.</p>
      )}
    </ul>
  );
};

export default SavedFacts;

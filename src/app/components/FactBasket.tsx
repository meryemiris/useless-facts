import { useCallback, useRef, useState } from "react";

import styles from "./FactBasket.module.css";

import { IoBagOutline } from "react-icons/io5";
import { AiOutlineClear, AiOutlineSave } from "react-icons/ai";

import { toast } from "sonner";
import { useAuthContext } from "../lib/AuthContext";
import { useFactContext } from "../lib/FactContext";
import useClickOutside from "../lib/useClickOutside";
import { supabase } from "../lib/supabase";

const FactBasket = () => {
  const { userId } = useAuthContext();
  const { factBasket: facts, clearBasket, removeFromBasket } = useFactContext();

  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback(() => setDropdownVisible(false), []);

  useClickOutside(dropdownRef, handleClickOutside, dropdownVisible);

  const handleSaveData = async () => {
    // Fetch existing facts from the database
    const { data: existingFacts, error: fetchError } = await supabase
      .from("facts")
      .select("text")
      .eq("user_id", userId);

    if (fetchError) {
      toast.error(
        "Oops! Something went wrong while fetching existing facts. Please try again later.",
      );
      return;
    }

    const existingFactsSet = new Set(existingFacts.map((fact) => fact.text));

    const newFactsArray = facts
      .filter((fact) => !existingFactsSet.has(fact.text)) // Filter out already existing facts
      .map((fact) => ({
        text: fact.text,
        user_id: userId,
      }));

    if (newFactsArray.length === 0) {
      toast.info("No new facts to save.");
      return;
    }

    const { error: insertError } = await supabase
      .from("facts")
      .insert(newFactsArray)
      .select();

    if (insertError) {
      toast.error(
        "Oops! Something went wrong while saving your facts. Please try again later.",
      );
      return;
    }

    clearBasket();
    toast.success("Facts have been saved successfully.");
    setDropdownVisible(false);
  };

  return (
    <div className={`${styles.factBasket} ${styles.showRight}`}>
      <button
        className={styles.basketButton}
        onClick={() => setDropdownVisible(!dropdownVisible)}
      >
        <IoBagOutline className={styles.basketIcon} />
        Basket
        {facts?.length > 0 && (
          <span className={styles.basketCount}>
            {facts.length < 10 ? facts.length : "9+"}
          </span>
        )}
      </button>

      <div
        ref={dropdownRef}
        id="dropdown"
        className={`${styles.dropdown} ${dropdownVisible ? styles.show : ""} `}
      >
        {facts?.length > 0 ? (
          <ul className={styles.facts}>
            {facts.map((fact) => (
              <li className={styles.fact} key={fact.id}>
                <p> {fact.text}</p>
                <button
                  className={styles.binButton}
                  onClick={() => removeFromBasket(fact.id)}
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
            ))}
            <div className={styles.actionButtons}>
              <button onClick={clearBasket} className={styles.clearButton}>
                Clear <AiOutlineClear className={styles.icon} />
              </button>
              <button onClick={handleSaveData} className={styles.saveButton}>
                Save
                <AiOutlineSave className={styles.icon} />
              </button>
            </div>
          </ul>
        ) : (
          <p className={styles.emptyBasket}>
            Your basket is empty. Start exploring and add some interesting
            facts!
          </p>
        )}
      </div>
    </div>
  );
};

export default FactBasket;

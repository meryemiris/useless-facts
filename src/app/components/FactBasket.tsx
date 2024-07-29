import { useCallback, useRef, useState } from "react";

import styles from "./FactBasket.module.css";

import { IoBagOutline } from "react-icons/io5";
import { AiOutlineClear, AiOutlineSave } from "react-icons/ai";

import { toast } from "sonner";
import { useFactContext } from "@/app/lib/FactContext";
import { useAuthContext } from "@/app/lib/AuthContext";
import useClickOutside from "@/app/lib/useClickOutside";
import { supabase } from "@/app/lib/supabase";
import AnimatedBinButton from "../ui/AnimatedBinButton";

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
                <AnimatedBinButton
                  factId={fact.id}
                  onDelete={removeFromBasket}
                />
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

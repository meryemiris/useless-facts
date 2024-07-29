import { useRef } from "react";

import styles from "./FactBasket.module.css";

import { IoBagOutline } from "react-icons/io5";
import { AiOutlineClear, AiOutlineSave } from "react-icons/ai";

import { toast } from "sonner";
import { useFactContext } from "@/app/lib/FactContext";
import { useAuthContext } from "@/app/lib/AuthContext";
import { supabase } from "@/app/lib/supabase";
import AnimatedBinButton from "../ui/AnimatedBinButton";
import Dropdown from "./Dropdown";

const FactBasket = () => {
  const { userId } = useAuthContext();
  const { factBasket: facts, clearBasket, removeFromBasket } = useFactContext();

  const basketRef = useRef<HTMLDivElement>(null);
  const icon = <IoBagOutline size={32} />;
  const label = "Basket";

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
    toast.success("Facts Whave been saved successfully.");
    // TODO: close dropdown when save or clear
  };

  return (
    <Dropdown
      label={label}
      icon={icon}
      dropdownRef={basketRef}
      bannerCount={facts?.length}
    >
      {facts?.length > 0 ? (
        <ul className={styles.facts}>
          {facts.map((fact) => (
            <li className={styles.fact} key={fact.id}>
              <p> {fact.text}</p>
              <AnimatedBinButton factId={fact.id} onDelete={removeFromBasket} />
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
          Your basket is empty. Start exploring and add some interesting facts!
        </p>
      )}
    </Dropdown>
  );
};

export default FactBasket;

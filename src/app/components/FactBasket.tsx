import { useState } from "react";
import { toast } from "sonner";
import { useFactContext } from "@/app/lib/FactContext";

import styles from "./FactBasket.module.css";

import { IoBagOutline } from "react-icons/io5";
import { AiOutlineClear, AiOutlineSave } from "react-icons/ai";

import AnimatedBinButton from "../ui/AnimatedBinButton";
import Dropdown from "../ui/Dropdown";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

const FactBasket = () => {
  const supabase = createClient();
  const { factBasket: facts, clearBasket, removeFromBasket } = useFactContext();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const icon = <IoBagOutline size={32} />;
  const label = "Basket";

  const handleSaveData = async () => {
    // Get the user ID
    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError || !userData?.user) {
      redirect("/login");
    }

    const userId = userData.user.id;

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
        language: fact.language,
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
    toast.success("Saved!");
    setIsDropdownOpen(false);
  };

  return (
    <Dropdown
      label={label}
      icon={icon}
      bannerCount={facts?.length}
      isOpen={isDropdownOpen}
      setIsOpen={setIsDropdownOpen}
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

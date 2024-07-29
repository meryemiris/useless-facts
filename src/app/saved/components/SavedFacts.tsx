"use client";
import { useEffect, useState } from "react";

import Image from "next/image";

import styles from "./SavedFacts.module.css";

import { toast } from "sonner";
import Loading from "@/app/ui/Loading";
import { supabase } from "@/app/lib/supabase";
import { useAuthContext } from "@/app/lib/AuthContext";
import { Fact } from "@/app/lib/types";
import AnimatedBinButton from "@/app/ui/AnimatedBinButton";

const SavedFacts = () => {
  const { userId } = useAuthContext();

  const [savedFacts, setSavedFacts] = useState<Fact[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      const getSavedFacts = async () => {
        const { data, error } = await supabase
          .from("facts")
          .select(
            `
            id,
            text
          `,
          )
          .eq("user_id", userId);

        if (error) {
          console.log(error);
          toast.error(
            "Oops! Something went wrong while getting your saved tasks. Please check back in a bit.",
          );
        } else {
          console.log("data", data);
          setSavedFacts(data);
        }

        setIsLoading(false);
      };

      getSavedFacts();
    }
  }, [userId]);

  const handleDeleteFact = async (id: number | string) => {
    const { error } = await supabase.from("facts").delete().eq("id", id);

    if (error) {
      console.log(error);
      toast.error(
        "Oops! Something went wrong while deleting task. Please try again in a bit",
      );
    } else {
      setSavedFacts((prev) => prev.filter((fact) => fact.id !== id));
      toast.success("Fact successfully removed.");
    }
  };

  useEffect(() => {
    const channels = supabase
      .channel("custom-insert-channel")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "facts" },
        (payload) => {
          setSavedFacts((prev) => [...prev, payload.new as unknown as Fact]);
        },
      )
      .subscribe();
    return () => {
      channels.unsubscribe().catch((error) => {
        console.error("Failed to unsubscribe:", error);
      });
    };
  }, []);

  return isLoading ? (
    <Loading />
  ) : savedFacts?.length > 0 ? (
    <ul className={styles.facts}>
      {savedFacts?.map((fact) => (
        <li className={styles.fact} key={fact.id}>
          <Image
            className={styles.modalImg}
            src={"/fact.svg"}
            width={40}
            height={40}
            alt="fact modal image"
          />
          <p> {fact.text}</p>
          <AnimatedBinButton factId={+fact.id} onDelete={handleDeleteFact} />
        </li>
      ))}
    </ul>
  ) : (
    <p className={styles.noFacts}>
      Start saving some facts! You have no saved facts yet.
    </p>
  );
};

export default SavedFacts;

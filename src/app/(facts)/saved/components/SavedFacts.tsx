"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { toast } from "sonner";

import { createClient } from "@/utils/supabase/client";
import { Fact, Language } from "@/utils/types";

import Filter from "./Filters";
import Card from "./Card";

const SavedFacts = () => {
  const [savedFacts, setSavedFacts] = useState<Fact[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterLanguage, setFilterLanguage] = useState<Language | "all">("all");
  const router = useRouter();

  const supabase = createClient();

  useEffect(() => {
    const fetchUserDataAndFacts = async () => {
      // Get the user data
      const { data: userData, error: userError } =
        await supabase.auth.getUser();

      if (userError || !userData?.user) {
        router.push("/login");
      }

      const userId = userData?.user?.id;

      if (userId) {
        // Fetch saved facts
        const { data, error } = await supabase
          .from("facts")
          .select("id, text, language")
          .eq("user_id", userId);

        if (error) {
          console.log(error);
          toast.error(
            "Oops! Something went wrong while getting your saved tasks. Please check back in a bit.",
          );
        } else {
          setSavedFacts(data);
        }

        setIsLoading(false);
      }
    };

    fetchUserDataAndFacts();
  }, [supabase, router]);

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

  function onFilter(language: Language | "all") {
    setFilterLanguage(language);
  }

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
  }, [supabase]);

  const filteredFacts =
    filterLanguage === "all"
      ? savedFacts
      : savedFacts.filter((fact) => fact.language === filterLanguage);

  return (
    <>
      <Filter onFilter={onFilter} activeLanguage={filterLanguage} />

      <Card
        facts={filteredFacts}
        onDelete={handleDeleteFact}
        loading={isLoading}
      />
    </>
  );
};

export default SavedFacts;

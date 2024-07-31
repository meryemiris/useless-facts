"use server";

import { redirect } from "next/navigation";
import RandomFact from "../components/RandomFact";
import TodayFact from "../components/TodayFact";
import { createClient } from "@/utils/supabase/server";

export default async function HomePage() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  console.log(data);
  if (error || !data?.user) {
    redirect("/login");
  }

  return (
    <>
      <TodayFact />
      <RandomFact />
    </>
  );
}

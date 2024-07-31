import { redirect } from "next/navigation";
import RandomFact from "../components/RandomFact";
import TodayFact from "../components/TodayFact";
import { supabase } from "../lib/supabase";

export default async function HomePage() {
  const { data, error } = await supabase.auth.getUser();
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

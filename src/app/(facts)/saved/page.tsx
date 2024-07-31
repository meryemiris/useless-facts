import { redirect } from "next/navigation";
import SavedFacts from "./components/SavedFacts";
import { createClient } from "@/utils/supabase/server";

export default async function SavedFactsPage() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  console.log(data);
  if (error || !data?.user) {
    redirect("/login");
  }
  return <SavedFacts />;
}

"use server";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function authenticateUser(
  formData: FormData,
  action: "login" | "signup",
) {
  const supabase = createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } =
    action === "login"
      ? await supabase.auth.signInWithPassword(data)
      : await supabase.auth.signUp(data);

  if (error) {
    return error.message;
  }

  revalidatePath("/", "layout");
  redirect("/");
}

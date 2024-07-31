"use server";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

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
    console.log(error);
    return {
      success: false,
      message: `Authentication failed: ${error.message}`,
    };
  }

  revalidatePath("/", "layout");
  return {
    success: true,
    message: action === "login" ? "Login successful!" : "Signup successful!",
  };
}

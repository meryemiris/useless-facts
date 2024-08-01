"use client";

import { IoMdLogOut } from "react-icons/io";
import styles from "./Navbar.module.css";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Logout() {
  const router = useRouter();

  const handleSignOut = async () => {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
      toast.error("Unable to sign out at the moment. Please try again later.");
    } else {
      toast.success("Successfully signed out.");
      router.push("/login");
    }
  };

  return (
    <button
      aria-label="Sign out"
      onClick={handleSignOut}
      className={styles.navButton}
    >
      <IoMdLogOut className={styles.icon} />
      Logout
    </button>
  );
}

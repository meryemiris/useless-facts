"use client";

import { IoMdLogOut } from "react-icons/io";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import styles from "./HamburgerMenu.module.css";

export default function Logout() {
  const router = useRouter();
  const supabase = createClient();

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Something went wrong while signing out. Please try again.");
      return;
    }
    router.push("/login");
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

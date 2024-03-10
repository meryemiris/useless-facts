import { useState } from "react";
import { useRouter } from "next/router";

import Link from "next/link";

import { supabase } from "@/lib/supabase";

import styles from "./Login.module.css";
import Loading from "../utils/Loading";

import { toast } from "sonner";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      toast.warning(
        "Please fill in both email and password before signing in.",
      );
      return;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      toast.warning("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      toast.warning("Please enter a valid password (at least 6 characters).");
      return;
    }

    setIsLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setIsLoading(false);

    if (error) {
      const errorMessage =
        error.message === "Invalid login credentials"
          ? "User not found or incorrect password. Please double-check your credentials."
          : "Something went wrong while signing in. Please try again later.";

      toast.error(errorMessage);
      setEmail("");
      setPassword("");
    } else {
      toast.success("Welcome back! You've signed in successfully.");
      router.push("/");
    }
  };

  return (
    <div className={styles.container}>
      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >
        <header>
          <h1>Welcome!</h1>
          <h2>Ready to Sign In?</h2>
        </header>
        <main className={styles.main}>
          <div className={styles.inputGroup}>
            <input
              id="email"
              type="text"
              name="email"
              autoComplete="off"
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className={styles.userLabel} htmlFor="email">
              Email
            </label>
          </div>
          <div className={styles.inputGroup}>
            <input
              id="password"
              type="password"
              name="password"
              autoComplete="current-password"
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label className={styles.userLabel} htmlFor="password">
              Password
            </label>
          </div>
          <button className={styles.button} type="submit" disabled={isLoading}>
            {isLoading ? <Loading size="sm" /> : "Login In"}
          </button>

          <div className={styles.link}>
            <i>No account?</i>
            <Link href="/signup">Sign Up</Link>
          </div>
        </main>
      </form>
    </div>
  );
}

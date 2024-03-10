import { useState } from "react";
import { useRouter } from "next/router";

import Link from "next/link";

import { supabase } from "@/lib/supabase";

import styles from "./Login.module.css";

import Alert, { alertMessage } from "../Alert";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState<alertMessage | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const showAlert = (type: string, title: string, message: string) => {
    setAlert({ title, message, type });
    setTimeout(() => setAlert(null), 5000);
  };

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      if (!email || !password) {
        showAlert(
          "warning",
          "Hey there!",
          "Please fill in both email and password before signing in.",
        );
        return;
      }
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        showAlert(
          "warning",
          "Hey there!",
          "Please enter a valid email address.",
        );
        return;
      }

      if (password.length < 6) {
        showAlert(
          "warning",
          "Hey there!",
          "Please enter a valid password (at least 6 characters).",
        );
        return;
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        if (error.message === "Invalid login credentials") {
          showAlert(
            "error",
            "Oops!",
            "User not found or incorrect password. Please double-check your credentials.",
          );
        } else {
          showAlert(
            "error",
            "Uh-oh!",
            "Something went wrong while signing in. Please try again later.",
          );
        }
        return;
      } else {
        showAlert("success", "Welcome back!", "You've signed in successfully.");
        router.push("/");
      }
    } catch (error) {
      showAlert(
        "error",
        "Uh-oh!",
        "Something unexpected happened. Please try again later.",
      );
    } finally {
      setIsLoading(false);
      setEmail("");
      setPassword("");
    }
  };

  return (
    <>
      {alert && (
        <Alert
          title={alert.title}
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert(null)}
        />
      )}
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
                autoComplete="off"
                className={styles.input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label className={styles.userLabel} htmlFor="password">
                Password
              </label>
            </div>
            <button className={styles.button} type="submit">
              Login
            </button>

            <div className={styles.link}>
              <i>No account?</i>
              <Link href="/signup">Sign Up</Link>
            </div>
          </main>
        </form>
      </div>
    </>
  );
}

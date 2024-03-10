import { useState } from "react";
import { supabase } from "../../lib/supabase";

import styles from "./Login.module.css";

import Alert, { alertMessage } from "../utils/Alert";
import Link from "next/link";
import { useRouter } from "next/router";
import Loading from "../utils/Loading";

export default function Signup() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [alert, setAlert] = useState<alertMessage | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const showAlert = (type: string, title: string, message: string) => {
    setAlert({ title, message, type });
    setTimeout(() => setAlert(null), 5000);
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
      showAlert("warning", "Hey there!", "Please enter a valid email address.");
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

    setIsLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    setIsLoading(false);

    if (!error) {
      showAlert("success", "Welcome!", "You have successfully registered.");
      router.push("/login");
    } else {
      showAlert("error", "Error", "Error registering user. Please try again.");
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
        <form onSubmit={handleRegister} className={styles.form}>
          <header className={styles.header}>
            <h1>Start Now!</h1>
            <h2>Join for Free.</h2>
          </header>
          <main className={styles.main}>
            <div className={styles.inputGroup}>
              <input
                value={email}
                className={styles.input}
                type="email"
                id="email"
                onChange={(e) => setEmail(e.currentTarget.value)}
                autoComplete="email"
              />
              <label className={styles.userLabel} htmlFor="email">
                Email
              </label>
            </div>

            <div className={styles.inputGroup}>
              <input
                value={password}
                className={styles.input}
                type="password"
                id="password"
                onChange={(e) => setPassword(e.currentTarget.value)}
                autoComplete="current-password"
              />
              <label className={styles.userLabel} htmlFor="password">
                Password
              </label>
            </div>
            <button className={styles.button} disabled={isLoading}>
              {isLoading ? <Loading size="sm" /> : "Sign Up"}
            </button>

            <div className={styles.link}>
              <i>Already have an account?</i>
              <Link href="/login">Login</Link>
            </div>
          </main>
        </form>
      </div>
    </>
  );
}

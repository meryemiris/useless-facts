import { useState } from "react";
import { supabase } from "../../lib/supabase";

import styles from "./Login.module.css";

import Alert, { alertMessage } from "../utils/Alert";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Signup() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [alert, setAlert] = useState<alertMessage | null>(null);

  const showAlert = (type: string, title: string, message: string) => {
    setAlert({ title, message, type });
    setTimeout(() => setAlert(null), 5000);
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const emailCheck = await supabase
      .from("user")
      .select("email")
      .eq("email", email);

    try {
      if (!email || !password) {
        showAlert(
          "warning",
          "Hey there!",
          "Please fill in both email and password before signing in.",
        );
        return;
      }

      if (emailCheck.data && emailCheck.data.length > 0) {
        showAlert(
          "warning",
          "Hey there!",
          "There is already an account with this email. Please login instead.",
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

      const {
        data: { user },
        error,
      } = await supabase.auth.signUp({
        email,
        password,
      });

      if (!error) {
        console.log("User registered successfully:", user);

        if (user) {
          const { data, error: insertError } = await supabase
            .from("user")
            .insert([
              {
                id: user.id,
              },
            ])
            .select();

          router.push("/");

          if (insertError) {
            console.log("Error inserting user:", insertError);
          } else console.log("User inserted successfully:", data);
        }
      }

      showAlert("success", "Welcome!", "You have successfully registered.");

      // email verification is closed bcs of free plan has limited quota
      // showAlert(
      // 	"success",
      // 	"Welcome!",
      // 	`\nPlease check your email (${email}) and confirm your account. `
      // );
    } catch (error) {
      console.error("Error registering user:", error);
      showAlert("error", "Error", "Error registering user. Please try again.");
    } finally {
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
              />
              <label className={styles.userLabel} htmlFor="password">
                Password
              </label>
            </div>
            <button className={styles.button}>Signup</button>

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

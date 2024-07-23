import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

import styles from "./AuthForm.module.css";
import Loading from "../utils/Loading";

import { IoEye, IoEyeOff } from "react-icons/io5";

type AuthFormProps = {
  action: "login" | "signup";
};

const AuthForm: React.FC<AuthFormProps> = ({ action }) => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleAuth = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (action === "login") {
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
    } else if (action === "signup") {
      if (!email || !password) {
        toast.warning("Please fill in both email and password.");
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
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      setIsLoading(false);

      if (error) {
        toast.error("Oops! Registration failed. Please try again.");
        return;
      }

      toast.success("Congratulations! Registration successful. Welcome!");
      router.push("/");
    }
  };

  return (
    <form className={styles.form} onSubmit={handleAuth}>
      <main>
        <div className={styles.inputGroup}>
          <input
            id="email"
            type="text"
            name="email"
            autoComplete="off"
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label className={styles.userLabel} htmlFor="email">
            Email
          </label>
        </div>

        <div className={styles.inputGroup}>
          <input
            id="password"
            type={isPasswordVisible ? "text" : "password"}
            name="password"
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
          <label className={styles.userLabel} htmlFor="password">
            Password
          </label>
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className={styles.passwordVisiblityButton}
          >
            {isPasswordVisible ? <IoEye /> : <IoEyeOff />}
          </button>
        </div>

        <button className={styles.button} type="submit" disabled={isLoading}>
          {isLoading ? (
            <Loading size="sm" />
          ) : action === "login" ? (
            "Login"
          ) : (
            "Sign Up"
          )}
        </button>

        <div className={styles.link}>
          <i>
            {action === "login" ? "No account?" : "Already have an account?"}
          </i>
          <Link href={action === "login" ? "/signup" : "/login"}>
            {action === "login" ? "Sign Up" : "Login"}
          </Link>
        </div>
      </main>
    </form>
  );
};

export default AuthForm;

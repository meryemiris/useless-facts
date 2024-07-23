import { useState } from "react";

import { useRouter } from "next/router";
import Link from "next/link";

import { supabase } from "../../lib/supabase";

import styles from "./Login.module.css";

import Loading from "../utils/Loading";
import { toast } from "sonner";

import { IoEye, IoEyeOff } from "react-icons/io5";

export default function Signup() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <form onSubmit={handleRegister} className={styles.form}>
      <main className={styles.main}>
        <div className={styles.inputGroup}>
          <input
            value={email}
            className={styles.input}
            type="email"
            id="email"
            onChange={(e) => setEmail(e.currentTarget.value)}
            required
          />
          <label className={styles.userLabel} htmlFor="email">
            Email
          </label>
        </div>

        <div className={styles.inputGroup}>
          <input
            value={password}
            className={styles.input}
            type={isPasswordVisible ? "text" : "password"}
            id="password"
            onChange={(e) => setPassword(e.currentTarget.value)}
            required
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
        <button className={styles.button} disabled={isLoading}>
          {isLoading ? <Loading size="sm" /> : "Sign Up"}
        </button>

        <div className={styles.link}>
          <i>Already have an account?</i>
          <Link href="/login">Login</Link>
        </div>
      </main>
    </form>
  );
}

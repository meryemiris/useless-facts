"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./AuthForm.module.css";

import { toast } from "sonner";
import { authenticateUser } from "../action";

import { IoEye, IoEyeOff } from "react-icons/io5";
import Loading from "@/ui/LoadingSpinner";

type AuthFormProps = {
  action: "login" | "signup";
  header: string;
  subheader: string;
};

const AuthForm: React.FC<AuthFormProps> = ({ action, header, subheader }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () =>
    setIsPasswordVisible(!isPasswordVisible);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const errorMessage = await authenticateUser(formData, action);
    const successMessage =
      action === "login" ? "Login successful!" : "Signup successful!";

    if (errorMessage) {
      toast.error(`Authentication failed: ${errorMessage}`);
    } else {
      toast.success(successMessage);
    }

    setIsLoading(false);
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <header className={styles.header}>
        <h1>{header}</h1>
        <h2>{subheader}</h2>
      </header>
      <main>
        <div className={styles.inputGroup}>
          <input
            id="email"
            type="text"
            name="email"
            className={styles.input}
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
            required
            autoComplete="current-password"
          />
          <label className={styles.userLabel} htmlFor="password">
            Password
          </label>
          <button
            aria-label="Toggle password visibility"
            type="button"
            onClick={togglePasswordVisibility}
            className={styles.passwordVisiblityButton}
          >
            {isPasswordVisible ? <IoEye /> : <IoEyeOff />}
          </button>
        </div>
        <button
          aria-label="Submit"
          className={styles.button}
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loading size="sm" />
          ) : action === "login" ? (
            "Login"
          ) : (
            "Sign Up"
          )}
        </button>
        <div className={styles.link}>
          {action === "login" ? (
            <>
              <i>No account?</i>
              <Link href="/signup">Sign Up</Link>
            </>
          ) : (
            <>
              <i>Already have an account?</i>
              <Link href="/login">Login</Link>
            </>
          )}
        </div>
      </main>
    </form>
  );
};

export default AuthForm;

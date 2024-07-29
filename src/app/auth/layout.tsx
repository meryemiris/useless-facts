import styles from "./style.module.css";
import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.container}>
      <main className={styles.content}>
        <section className={styles.headSection}>
          <header className={styles.header}>
            <h1>{"header"}</h1>
            <h2 className={styles.subheader}>{"subheader"}</h2>
          </header>
          <Image
            src="/readingOwl.png"
            alt="owl reading book"
            width={100}
            height={100}
            className={styles.readingOwl}
          />
        </section>
        <section className={styles.form}>{children}</section>
      </main>
    </div>
  );
}

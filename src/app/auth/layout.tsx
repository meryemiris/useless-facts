import styles from "./AuthLayout.module.css";
import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.container}>
      <main className={styles.content}>
        <section className={styles.imageContainer}>
          <Image
            src="/readingOwl.png"
            alt="owl reading book"
            width={100}
            height={100}
            className={styles.image}
            priority
          />
        </section>
        <section className={styles.form}>{children}</section>
      </main>
    </div>
  );
}

import styles from "./AuthLayout.module.css";
import Image from "next/image";

import owlImg from "@/public/readingOwl.png";

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
            src={owlImg}
            alt="owl reading book"
            className={styles.image}
            priority
          />
        </section>
        <section className={styles.form}>{children}</section>
      </main>
    </div>
  );
}

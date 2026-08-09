import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <span>신한DS 개발팀</span>
        <span className={styles.dot}>·</span>
        <span>Next.js + Spring Boot</span>
      </div>
    </footer>
  );
}

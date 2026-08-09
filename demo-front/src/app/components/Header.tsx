import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <span className={styles.title}>Demo</span>
        <span className={styles.subtitle}>사용자 정보 조회</span>
      </div>
    </header>
  );
}

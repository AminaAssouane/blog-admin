import styles from "./Navbar.module.css";

export function Navbar({ className }) {
  return (
    <>
      <section className={`${styles.headerWrapper} ${className}`}>
        <header className={styles.header}>
          <h1>Amina's blog</h1>
          <div>Welcome, admin!</div>
        </header>
        <nav>
          <ul className={styles.navBar}>
            <li>All</li>
            <li>Published posts</li>
            <li>Unpublished posts</li>
          </ul>
        </nav>
      </section>
    </>
  );
}

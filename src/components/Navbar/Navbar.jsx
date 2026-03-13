import styles from "./Navbar.module.css";
import { Link } from "react-router";

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
            <li>
              <Link to="/">All</Link>
            </li>
            <li>
              <Link to="posts/">Published posts</Link>
            </li>
            <li>
              <Link to="posts/unpublished">Unpublished posts</Link>
            </li>
          </ul>
        </nav>
      </section>
    </>
  );
}

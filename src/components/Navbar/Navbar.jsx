import styles from "./Navbar.module.css";
import { Link } from "react-router";
import logo from "../../assets/icons/logo.svg";

export function Navbar({ className }) {
  return (
    <>
      <section className={`${styles.headerWrapper} ${className}`}>
        <header className={styles.header}>
          <h1 className={styles.title}>
            <img src={logo} alt="logo" className={styles.logo} />
            <div>
              Amina's <span className="violet">blog</span>
            </div>
          </h1>
          <div className={styles.welcome}>
            Welcome, <span className="violet">admin</span>!
          </div>
        </header>
        <nav>
          <ul className={styles.navBar}>
            <li>
              <Link to="/">All posts</Link>
            </li>
            <li>
              <Link to="/publishedposts">Published posts</Link>
            </li>
            <li>
              <Link to="/unpublishedposts">Unpublished posts</Link>
            </li>
          </ul>
        </nav>
      </section>
    </>
  );
}

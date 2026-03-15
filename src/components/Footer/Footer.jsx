import styles from "./Footer.module.css";
import github from "../../assets/icons/github.svg";
import linkedin from "../../assets/icons/linkedin.svg";

export function Footer({ className }) {
  return (
    <footer className={className}>
      <div>Made by Amina Assouane</div>
      <div className={styles.logos}>
        <a href="https://github.com/AminaAssouane" target="_blank">
          <img src={github} alt="github" className={styles.github} />
        </a>
        <a href="https://www.linkedin.com/in/amina-assouane/" target="_blank">
          <img src={linkedin} alt="linkedin" className={styles.linkedin} />
        </a>
      </div>
    </footer>
  );
}

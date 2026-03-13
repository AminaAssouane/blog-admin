import styles from "./Sidebar.module.css";

export function Sidebar({ className }) {
  return (
    <aside className={className}>
      <ul className={styles.sideBar}>
        <li>Create post</li>
        <li>Logout</li>
      </ul>
    </aside>
  );
}

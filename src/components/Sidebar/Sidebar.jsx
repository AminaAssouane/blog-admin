import styles from "./Sidebar.module.css";
import { useNavigate } from "react-router";

export function Sidebar({ className }) {
  const navigate = useNavigate();
  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }
  return (
    <aside className={className}>
      <ul className={styles.sideBar}>
        <li>Create post</li>
        <li onClick={handleLogout}>Logout</li>
      </ul>
    </aside>
  );
}

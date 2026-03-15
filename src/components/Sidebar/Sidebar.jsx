import styles from "./Sidebar.module.css";
import { useNavigate } from "react-router";
import { Link } from "react-router";

export function Sidebar({ className }) {
  const navigate = useNavigate();
  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }
  return (
    <aside className={className}>
      <ul className={styles.sideBar}>
        <Link to="createpost">Create post</Link>
        <button onClick={handleLogout}>Logout</button>
      </ul>
    </aside>
  );
}

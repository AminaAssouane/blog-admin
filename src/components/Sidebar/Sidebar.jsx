import styles from "./Sidebar.module.css";
import { useNavigate } from "react-router";
import { Link } from "react-router";
import create from "../../assets/icons/create.svg";
import logout from "../../assets/icons/logout.svg";

export function Sidebar({ className }) {
  const navigate = useNavigate();
  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }
  return (
    <aside className={className}>
      <ul className={styles.sideBar}>
        <Link to="createpost">
          Create post{" "}
          <img src={create} alt="create" className={styles.create} />
        </Link>
        <button onClick={handleLogout} className={styles.logoutBtn}>
          Logout <img src={logout} alt="logout" className={styles.logout} />
        </button>
      </ul>
    </aside>
  );
}

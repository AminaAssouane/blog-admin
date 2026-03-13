import styles from "./Dashboard.module.css";
import { Outlet } from "react-router";
import { Sidebar } from "../Sidebar/Sidebar.jsx";
import { Navbar } from "../Navbar/Navbar.jsx";

export function Dashboard() {
  return (
    <>
      <div className={styles.container}>
        <Navbar className={styles.navBar} />
        <Sidebar className={styles.sideBar} />
        <main className={styles.main}>
          <Outlet />
        </main>
      </div>
    </>
  );
}

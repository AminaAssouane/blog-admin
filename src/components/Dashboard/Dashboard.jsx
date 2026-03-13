import { Outlet } from "react-router";
import { Sidebar } from "../Sidebar/Sidebar.jsx";
import { Navbar } from "../Navbar/Navbar.jsx";

export function Dashboard() {
  return (
    <>
      <Sidebar />
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  );
}

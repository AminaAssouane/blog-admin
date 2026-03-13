import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/Sidebar/Sidebar";
import { Navbar } from "../components/Navbar/Navbar";

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

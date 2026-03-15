import styles from "./Login.module.css";
import { useState } from "react";
import { useNavigate } from "react-router";
import login from "../../assets/icons/login.svg";
import user from "../../assets/icons/user.svg";

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) throw Error;

      const data = await response.json();
      localStorage.setItem("token", data.token);
      console.log("Logged in!");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <main className={styles.loginPage}>
        <div className={styles.loginContainer}>
          <h1 className={styles.title}>Login</h1>
          <form onSubmit={handleSubmit}>
            <div className={styles.credentials}>
              <input
                type="text"
                id={styles.username}
                placeholder="Username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                required
              />

              <input
                type="password"
                name="password"
                id={styles.password}
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required
              />
            </div>
            <button type="submit" className={styles.submit}>
              Login <img src={login} alt="login" className={styles.loginIcon} />
            </button>
          </form>
        </div>
      </main>
    </>
  );
}

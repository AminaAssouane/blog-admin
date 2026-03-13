import styles from "./Login.module.css";
import { useState } from "react";
import { useNavigate } from "react-router";

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
      <main>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username : </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            required
          />
          <label htmlFor="password">Password : </label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          />
          <button type="submit">Login</button>
        </form>
      </main>
    </>
  );
}

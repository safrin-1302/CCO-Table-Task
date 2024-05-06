import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./logInPage.css";

const LogInPage = ({ settingPermission }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const checkLogin = (event) => {
    event.preventDefault();
    // Retrieve stored credentials from local storage
    const storedUsername = localStorage.getItem("username");
    const storedPassword = localStorage.getItem("password");
    if (username === storedUsername && password === storedPassword) {
      settingPermission(true);
      navigate("/landingPage");
    } else {
      alert("Invalid username or password");
    }
    setUsername("");
    setPassword("");
  };

  return (
    <>
      <div className="login">
        <form onSubmit={checkLogin}>
          <label htmlFor="username">Email:</label>
          <input
            type="email"
            id="username"
            placeholder="Email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Login</button>
        </form>
        <p>
          Don't have an account? <Link to="/signup">Sign up here</Link>.
        </p>
      </div>
    </>
  );
};

export default LogInPage;

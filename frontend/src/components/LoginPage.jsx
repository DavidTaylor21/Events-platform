import React, { useState, useContext } from "react";
import { UserContext } from "./UserContext";
import { userLogin } from "../../api";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);

  const handleLogin = (e) => {
    e.preventDefault();
    return userLogin(email, password).then((userData) => {
      setLoggedInUser(userData);
    }).catch((err) => {
      console.log(err)
      setError(err.msg || "An error occurred during login."); 
    });
  };

  return (
    <div>
      <h2>Login Page</h2>
      <p>{loggedInUser ? loggedInUser.name : "Not logged in"}</p>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email address:</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};


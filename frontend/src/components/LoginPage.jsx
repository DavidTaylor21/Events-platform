import React, { useState, useContext } from "react";
import { UserContext } from "./UserContext";
import { userLogin, userRegister } from "../../api";
import { Navigate } from "react-router-dom";

export const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const { setLoggedInUser } = useContext(UserContext);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoggingIn(true);
    userLogin(email, password)
      .then((userData) => {
        setLoggedInUser(userData);
        localStorage.setItem("eventsPlatformUser", JSON.stringify(userData));
        setIsLoggingIn(false);
        setRedirect(true);
      })
      .catch((err) => {
        setIsLoggingIn(false);
        setError(err.msg || "An error occurred during login.");
      });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setIsLoggingIn(true);
    userRegister(name, email, password)
      .then((userData) => {
        setLoggedInUser(userData);
        localStorage.setItem("eventsPlatformUser", JSON.stringify(userData));
        setIsLoggingIn(false);
        setRedirect(true);
      })
      .catch((err) => {
        console.log(err)
        setIsLoggingIn(false);
        setError(err.msg || "An error occurred during registration.");
      });
  };

  if (redirect) {
    return <Navigate to="/events" />;
  }

  return (
    <div>
      <h2>{isLogin ? "Login" : "Register"}</h2>
      <form onSubmit={isLogin ? handleLogin : handleRegister}>
        {!isLogin && (
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        )}
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
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
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" disabled={isLoggingIn}>
          {isLoggingIn ? "Processing..." : isLogin ? "Login" : "Register"}
        </button>
      </form>
      <p>
        {isLogin ? "Don't have an account?" : "Already have an account?"}
        <button onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Register" : "Login"}
        </button>
      </p>
    </div>
  );
};

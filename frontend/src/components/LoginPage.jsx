import React, { useState, useContext } from "react";
import { UserContext } from "./UserContext";
import { userLogin, userRegister } from "../../api";
import { Navigate } from "react-router-dom";
import "../App.css";
export const LoginPage = ({ isLoggedIn, setIsLoggedIn }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const { setLoggedInUser, setIsStaff } = useContext(UserContext);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoggingIn(true);
    userLogin(email, password)
      .then((userData) => {
        setLoggedInUser(userData);
        localStorage.setItem("eventsPlatformUser", JSON.stringify(userData));
        setIsLoggingIn(false);
        setRedirect(true);
        setIsLoggedIn(true);
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
        setIsLoggedIn(true);
      })
      .catch((err) => {
        setIsLoggingIn(false);
        setError(err.msg || "An error occurred during registration.");
      });
  };

  if (redirect || isLoggedIn) {
    return <Navigate to="/events" />;
  }

  return (
    <div className="login-container">
      <h2 className="login-title">{isLogin ? "Login" : "Register"}</h2>
      <form
        className="login-form"
        onSubmit={isLogin ? handleLogin : handleRegister}
      >
        {!isLogin && (
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              className="form-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        )}
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            className="form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="submit-button" disabled={isLoggingIn}>
          {isLoggingIn ? "Processing..." : isLogin ? "Login" : "Register"}
        </button>
      </form>
      <p className="toggle-auth">
        {isLogin ? "Don't have an account?" : "Already have an account?"}
        <button className="toggle-button" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Register" : "Login"}
        </button>
      </p>
    </div>
  );
};

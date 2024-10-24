import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("eventsPlatformUser");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setLoggedInUser(user);
      } catch (error) {
        localStorage.removeItem("eventsPlatformUser");
      }
    }
  }, []);

  const login = (userData) => {
    setLoggedInUser(userData);

    localStorage.setItem("eventsPlatformUser", JSON.stringify(userData));
  };

  const logout = () => {
    setLoggedInUser(null);

    localStorage.removeItem("eventsPlatformUser");
  };

  return (
    <UserContext.Provider
      value={{ setLoggedInUser, loggedInUser, login, logout }}
    >
      {children}
    </UserContext.Provider>
  );
};

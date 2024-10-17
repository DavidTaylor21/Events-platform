import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("eventsPlatformUser"));
    if (storedUser) {
      setLoggedInUser(storedUser);
    }
  }, []);

  const login = (userData) => {
    setLoggedInUser(userData);
    localStorage.setItem("eventsPlatformUser", JSON.stringify(userData)); 
  };

  const logout = () => {
    setLoggedInUser(null);
    localStorage.removeItem("eventsPlatformUser"); 
    console.log("user logged out")
  };

  return (
    <UserContext.Provider value={{ loggedInUser, login, logout , setLoggedInUser }}>
      {children}
    </UserContext.Provider>
  );
};

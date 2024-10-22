import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import '../App.css'; 

export const GoogleLoginButton = () => {
  const handleLoginSuccess = (credentialResponse) => {
    console.log(credentialResponse);
  };

  const handleLoginError = (error) => {
    console.error("Login Failed:", error);
  };

  return (
    <div className="google-login-container">
      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={handleLoginError}
      >
        <button className="google-login-button">
          Sign in with Google
        </button>
      </GoogleLogin>
    </div>
  );
};







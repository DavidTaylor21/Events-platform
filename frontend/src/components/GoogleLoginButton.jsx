import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const GoogleLoginButton = () => {
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("googleAccessToken")
  );

  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const clientSecret = import.meta.env.VITE_GOOGLE_CLIENT_SECRET;
  const redirectUri = import.meta.env.VITE_GOOGLE_REDIRECT_URI;
  const scope = "https://www.googleapis.com/auth/calendar";
  const responseType = "code";

  const initiateGoogleLogin = () => {
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=${responseType}&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&access_type=offline&prompt=consent`;
    window.location.href = authUrl;
  };

  const exchangeCodeForToken = (code) => {
    axios
      .post("https://oauth2.googleapis.com/token", {
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      })
      .then((response) => {
        setAccessToken(response.data.access_token);
        localStorage.setItem("googleAccessToken", response.data.access_token);
        navigate("/my-events");
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("googleAccessToken");
    setAccessToken(null);
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const code = queryParams.get("code");

    if (code && !accessToken) {
      exchangeCodeForToken(code);
    }
  }, [accessToken]);

  return (
    <div className="google-login-container">
      {!accessToken ? (
        <button className="google-login-button" onClick={initiateGoogleLogin}>
          Login with Google
        </button>
      ) : (
        <button className="google-logout-button" onClick={handleLogout}>
          Logout from Google
        </button>
      )}
    </div>
  );
};

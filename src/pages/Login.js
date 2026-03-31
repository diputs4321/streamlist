import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { parseJwt } from "../utils/parseJwt";
import "./Login.css";

function Login() {
  const googleButtonRef = useRef(null);
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const [error, setError] = useState("");
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  console.log("Google Client ID:", process.env.REACT_APP_GOOGLE_CLIENT_ID);

  const handleGoogleResponse = useCallback(
    (response) => {
      const profile = parseJwt(response.credential);

      if (!profile?.sub) {
        setError("Google sign-in succeeded, but the token could not be read.");
        return;
      }

      login(profile);
      navigate("/", { replace: true });
    },
    [login, navigate]
  );

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (!clientId) {
      setError("Missing REACT_APP_GOOGLE_CLIENT_ID in your .env file.");
      return;
    }

    const initializeGoogle = () => {
      if (!window.google || !googleButtonRef.current) {
        return;
      }

      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: handleGoogleResponse,
      });

      googleButtonRef.current.innerHTML = "";

      window.google.accounts.id.renderButton(googleButtonRef.current, {
        theme: "outline",
        size: "large",
        shape: "pill",
        text: "signin_with",
        width: 260,
      });
    };

    const existingScript = document.getElementById("google-gsi-script");

    if (existingScript) {
      initializeGoogle();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.id = "google-gsi-script";
    script.onload = initializeGoogle;
    script.onerror = () => {
      setError("Google sign-in script failed to load.");
    };

    document.body.appendChild(script);
  }, [clientId, handleGoogleResponse]);

  return (
    <main className="login-page">
      <section className="login-card">
        <h1>Sign in to StreamList</h1>
        <p>
          Please sign in with your Google account to access the EZTechMovie
          application.
        </p>

        <div ref={googleButtonRef} className="google-button-wrap" />

        {error && <p className="login-error">{error}</p>}
      </section>
    </main>
  );
}

export default Login;
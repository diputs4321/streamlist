import { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useLocalStorage("streamAuth", null);

  const login = (profile) => {
    setUser({
      sub: profile.sub,
      name: profile.name,
      email: profile.email,
      picture: profile.picture,
    });
  };

  const logout = () => {
    if (window.google?.accounts?.id) {
      window.google.accounts.id.disableAutoSelect();
    }

    setUser(null);
  };

  const isAuthenticated = Boolean(user?.sub);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
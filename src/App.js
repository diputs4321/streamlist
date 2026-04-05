import { Routes, Route, Navigate } from "react-router";
import Navbar from "./components/Navbar";
import StreamList from "./pages/StreamList";
import Movies from "./pages/Movies";
import Subscriptions from "./pages/Subscriptions";
import Cart from "./pages/Cart";
import About from "./pages/About";
import Login from "./pages/Login";
import CreditCardCheckout from "./pages/CreditCardCheckout";
import ProtectedRoute from "./components/ProtectedRoute";
import { CartProvider } from "./CartContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import "./App.css";

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <CartProvider>
      {isAuthenticated && <Navbar />}

      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <StreamList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/movies"
          element={
            <ProtectedRoute>
              <Movies />
            </ProtectedRoute>
          }
        />

        <Route
          path="/subscriptions"
          element={
            <ProtectedRoute>
              <Subscriptions />
            </ProtectedRoute>
          }
        />

        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />

        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <CreditCardCheckout />
            </ProtectedRoute>
          }
        />

        <Route
          path="/about"
          element={
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
          }
        />

        <Route
          path="*"
          element={
            <Navigate to={isAuthenticated ? "/" : "/login"} replace />
          }
        />
      </Routes>
    </CartProvider>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
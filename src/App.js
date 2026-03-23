import { Routes, Route } from "react-router";
import Navbar from "./components/Navbar";
import StreamList from "./pages/StreamList";
import Movies from "./pages/Movies";
import Subscriptions from "./pages/Subscriptions";
import Cart from "./pages/Cart";
import About from "./pages/About";
import { CartProvider } from "./CartContext";
import "./App.css";

function App() {
  return (
    <CartProvider>
      <>
        <Navbar />
        <Routes>
          <Route path="/" element={<StreamList />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/subscriptions" element={<Subscriptions />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </>
    </CartProvider>
  );
}

export default App;
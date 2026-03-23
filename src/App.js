import { Routes, Route } from "react-router";
import Navbar from "./components/Navbar";
import StreamList from "./pages/StreamList";
import Movies from "./pages/Movies";
import { CartProvider } from './CartContext';
// ... other imports

function App() {
  return (
    <CartProvider>
      <div className="App">
        {/* Your existing components like Navbar and Routes */}
      </div>
    </CartProvider>
  );
}
import About from "./pages/About";
import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<StreamList />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}

export default App;

import { NavLink } from "react-router-dom";
import logo from "../assets/images/EZTechMovieLogo.png";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <img src={logo} alt="EZTechMovie logo" className="navbar-logo" />
        <h2>StreamList</h2>
      </div>

      <div className="navbar-links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/movies">Movies</NavLink>
        <NavLink to="/subscriptions">Subscriptions</NavLink>
        <NavLink to="/cart">Cart</NavLink>
        <NavLink to="/about">About</NavLink>

        {user && <span>{user.name}</span>}
        {user && (
          <button type="button" onClick={logout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
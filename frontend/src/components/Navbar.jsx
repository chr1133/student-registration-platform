import { NavLink } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="navbar">
      <div className="navbar-brand">
        <div className="brand-logo">🎓</div>
        <div>
          <h1 className="brand-title">StudentReg</h1>
          <p className="brand-subtitle">Student Registration Platform</p>
        </div>
      </div>

      <nav className="navbar-links">
        <NavLink to="/" end className={({ isActive }) => (isActive ? "top-link active" : "top-link")}>
          ▦ Dashboard
        </NavLink>
        <NavLink to="/students" className={({ isActive }) => (isActive ? "top-link active" : "top-link")}>
          👤 Students
        </NavLink>
        <NavLink to="/register" className={({ isActive }) => (isActive ? "top-link active" : "top-link")}>
          ➕ Add Student
        </NavLink>
      </nav>

      <div className="navbar-right">
        <button className="icon-btn" title="Toggle theme" onClick={toggleTheme}>
          {theme === "light" ? "☀️" : "🌙"}
        </button>
      </div>
    </header>
  );
}

export default Navbar;
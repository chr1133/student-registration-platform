import { NavLink } from "react-router-dom";

function Navbar() {
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
        {/* Placeholder links — not wired to pages yet */}
        <span className="top-link disabled" title="Coming soon">📊 Reports</span>
        <span className="top-link disabled" title="Coming soon">👤 Profile</span>
      </nav>

      <div className="navbar-right">
        <button className="icon-btn" title="Toggle theme">☀️</button>
        <div className="admin-chip">
          <div className="admin-avatar">AD</div>
          <div>
            <p className="admin-name">Admin</p>
            <p className="admin-role">Administrator</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
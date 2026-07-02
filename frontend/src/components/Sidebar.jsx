import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">🎓 StudentReg</h2>
      <nav className="sidebar-nav">
        <NavLink to="/" end className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
          📊 Dashboard
        </NavLink>
        <NavLink to="/register" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
          ➕ Register Student
        </NavLink>
        <NavLink to="/students" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
          📋 Students
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;
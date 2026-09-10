import React from "react";
import { useNavigate } from "react-router-dom";
import { Search, Bell, Sun, Moon, Menu, Plus } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

function Header({ onToggleMobileSidebar, searchGlobal, setSearchGlobal }) {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const formattedDate = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <header className="app-header">
      <div className="header-left">
        <button
          className="mobile-toggle"
          onClick={onToggleMobileSidebar}
          aria-label="Toggle Navigation Menu"
        >
          <Menu style={{ width: 20, height: 20 }} />
        </button>

        <div className="header-search">
          <Search className="header-search-icon" />
          <input
            type="text"
            placeholder="Search students, courses..."
            value={searchGlobal || ""}
            onChange={(e) => setSearchGlobal && setSearchGlobal(e.target.value)}
          />
        </div>
      </div>

      <div className="header-right">
        <div className="header-date-badge">{formattedDate}</div>

        <button className="icon-button" onClick={toggleTheme} title="Toggle theme">
          {theme === "light" ? (
            <Moon style={{ width: 18, height: 18 }} />
          ) : (
            <Sun style={{ width: 18, height: 18 }} />
          )}
        </button>

        <button
          className="icon-button"
          onClick={() => navigate("/notifications")}
          title="Notifications"
        >
          <Bell style={{ width: 18, height: 18 }} />
          <span className="notification-dot" />
        </button>

        <button
          className="btn btn-primary btn-sm"
          onClick={() => navigate("/register")}
          style={{ marginLeft: 6 }}
        >
          <Plus style={{ width: 16, height: 16 }} />
          <span>Add Student</span>
        </button>
      </div>
    </header>
  );
}

export default Header;

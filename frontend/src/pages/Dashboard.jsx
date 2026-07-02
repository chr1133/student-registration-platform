import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StatCard from "../components/StatCard";
import { getStats } from "../services/api";
import { getInitials, getAvatarColor, formatDate } from "../utils/format";

function Dashboard() {
  const [stats, setStats] = useState({ total: 0, departments: 0, recent: [] });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await getStats();
      setStats(res.data);
    } catch (err) {
      console.error("Failed to load stats", err);
    } finally {
      setLoading(false);
    }
  };

  // Approximate "new this month" using the recent students returned by the API
  const newThisMonth = stats.recent.filter((s) => {
    const d = new Date(s.created_at);
    const now = new Date();
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  }).length;

  return (
    <div>
      {/* Hero banner */}
      <div className="hero-banner">
        <div className="hero-text">
          <h1>Welcome back!</h1>
          <p>Here's an overview of your student registration system.</p>
        </div>
        <div className="hero-decoration">
          <div className="hero-blob" />
          <div className="hero-dots" />
        </div>
      </div>

      <div className="stats-grid">
        <StatCard
          label="Total Students"
          value={loading ? "…" : stats.total}
          icon="👥"
          iconBg="#ecebfd"
          iconColor="#6366f1"
          trendText={`+${newThisMonth} this month`}
          trendColor="#6366f1"
        />
        <StatCard
          label="Departments"
          value={loading ? "…" : stats.departments}
          icon="🏛"
          iconBg="#fdece0"
          iconColor="#ef6c4d"
          trendText="Active departments"
          trendColor="#ef6c4d"
        />
        <StatCard
          label="Total Courses"
          value="0"
          icon="📖"
          iconBg="#fdf3d9"
          iconColor="#d4a017"
          trendText="No courses added"
          trendColor="#d4a017"
        />
        <StatCard
          label="New This Month"
          value={loading ? "…" : newThisMonth}
          icon="🆕"
          iconBg="#fde7ec"
          iconColor="#ec4899"
          trendText={newThisMonth > 0 ? "Growing" : "No new students"}
          trendColor="#ec4899"
        />
      </div>

      <div className="card">
        <div className="section-header">
          <div>
            <h3>Students</h3>
            <p className="page-subtitle">Manage and view all registered students</p>
          </div>
          <button className="btn btn-primary" onClick={() => navigate("/register")}>
            ➕ Add Student
          </button>
        </div>

        {stats.recent.length === 0 ? (
          <p className="muted">No students yet. Click "Add Student" to register your first one.</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Department</th>
                <th>Year</th>
                <th>Registered</th>
              </tr>
            </thead>
            <tbody>
              {stats.recent.map((s) => (
                <tr key={s.id} onClick={() => navigate(`/students/${s.id}`)} style={{ cursor: "pointer" }}>
                  <td><span className="id-badge">{s.student_id}</span></td>
                  <td>
                    <div className="name-cell">
                      <div className="avatar-sm" style={{ background: getAvatarColor(s.full_name) }}>
                        {getInitials(s.full_name)}
                      </div>
                      {s.full_name}
                    </div>
                  </td>
                  <td><span className="dept-badge">{s.department || "-"}</span></td>
                  <td>{s.year || "-"}</td>
                  <td>{formatDate(s.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
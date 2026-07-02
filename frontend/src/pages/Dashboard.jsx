import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StatCard from "../components/StatCard";
import { getStats } from "../services/api";

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

  return (
    <div>
      <div className="page-header">
        <h1>Dashboard</h1>
        <p className="page-subtitle">Welcome back! Here's an overview of your students.</p>
      </div>

      <div className="stats-grid">
        <StatCard label="Total Students" value={loading ? "…" : stats.total} icon="👥" color="#4f46e5" />
        <StatCard label="Departments" value={loading ? "…" : stats.departments} icon="🏛" color="#059669" />
        <StatCard label="Recently Added" value={loading ? "…" : stats.recent.length} icon="🆕" color="#d97706" />
      </div>

      <div className="quick-actions">
        <button className="btn btn-primary" onClick={() => navigate("/register")}>
          ➕ Add Student
        </button>
        <button className="btn btn-secondary" onClick={() => navigate("/students")}>
          📋 View Students
        </button>
      </div>

      <div className="card">
        <h3>Recently Added Students</h3>
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
              </tr>
            </thead>
            <tbody>
              {stats.recent.map((s) => (
                <tr key={s.id}>
                  <td>{s.student_id}</td>
                  <td>{s.full_name}</td>
                  <td>{s.department}</td>
                  <td>{s.year}</td>
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
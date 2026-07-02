import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getStudents, deleteStudent } from "../services/api";

function StudentList() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [deptFilter, setDeptFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await getStudents();
      setStudents(res.data);
    } catch (err) {
      console.error("Failed to load students", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete ${name}? This cannot be undone.`)) return;
    try {
      await deleteStudent(id);
      setStudents((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      alert("Failed to delete student");
    }
  };

  const departments = [...new Set(students.map((s) => s.department).filter(Boolean))];

  const filtered = students.filter((s) => {
    const matchesSearch =
      s.full_name.toLowerCase().includes(search.toLowerCase()) ||
      s.student_id.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase());
    const matchesDept = deptFilter ? s.department === deptFilter : true;
    return matchesSearch && matchesDept;
  });

  return (
    <div>
      <div className="page-header">
        <h1>Students</h1>
        <p className="page-subtitle">{students.length} student(s) registered</p>
      </div>

      <div className="toolbar">
        <input
          className="search-input"
          placeholder="🔍 Search by name, ID, or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={deptFilter} onChange={(e) => setDeptFilter(e.target.value)}>
          <option value="">All Departments</option>
          {departments.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
        <button className="btn btn-primary" onClick={() => navigate("/register")}>
          ➕ Add Student
        </button>
      </div>

      <div className="card">
        {loading ? (
          <p className="muted">Loading students...</p>
        ) : filtered.length === 0 ? (
          <p className="muted">No students found.</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Department</th>
                <th>Year</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => (
                <tr key={s.id}>
                  <td>{s.student_id}</td>
                  <td>{s.full_name}</td>
                  <td>{s.department || "-"}</td>
                  <td>{s.year || "-"}</td>
                  <td>{s.email}</td>
                  <td className="actions">
                    <button title="View" onClick={() => navigate(`/students/${s.id}`)}>👁</button>
                    <button title="Edit" onClick={() => navigate(`/students/${s.id}/edit`)}>✏</button>
                    <button title="Delete" onClick={() => handleDelete(s.id, s.full_name)}>🗑</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default StudentList;
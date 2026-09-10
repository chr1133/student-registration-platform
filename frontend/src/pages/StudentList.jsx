import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getStudents, deleteStudent } from "../services/api";
import { getInitials, getAvatarColor, formatDate } from "../utils/format";
import { useToast } from "../context/ToastContext";
import ConfirmDialog from "../components/ConfirmDialog";
import {
  Search,
  Plus,
  Eye,
  Edit,
  Trash2,
  Filter,
  Users,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
} from "lucide-react";

function StudentList() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [deptFilter, setDeptFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [loading, setLoading] = useState(true);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  // Deletion state for custom modal dialog
  const [deleteTarget, setDeleteTarget] = useState(null);

  const navigate = useNavigate();
  const { addToast } = useToast();

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await getStudents();
      setStudents(res.data);
    } catch (err) {
      console.error("Failed to load students", err);
      addToast("Failed to load student directory", "error");
    } finally {
      setLoading(false);
    }
  };

  const confirmDeleteStudent = async () => {
    if (!deleteTarget) return;
    try {
      await deleteStudent(deleteTarget.id);
      setStudents((prev) => prev.filter((s) => s.id !== deleteTarget.id));
      addToast(`Student ${deleteTarget.full_name} deleted successfully`, "success");
    } catch (err) {
      addToast("Failed to delete student", "error");
    } finally {
      setDeleteTarget(null);
    }
  };

  const departments = [...new Set(students.map((s) => s.department).filter(Boolean))];
  const years = [...new Set(students.map((s) => s.year).filter(Boolean))];

  const filteredStudents = students.filter((s) => {
    const query = search.toLowerCase();
    const matchesSearch =
      s.full_name.toLowerCase().includes(query) ||
      s.student_id.toLowerCase().includes(query) ||
      s.email.toLowerCase().includes(query);
    const matchesDept = deptFilter ? s.department === deptFilter : true;
    const matchesYear = yearFilter ? s.year === yearFilter : true;
    return matchesSearch && matchesDept && matchesYear;
  });

  // Calculate pagination slice
  const totalPages = Math.ceil(filteredStudents.length / pageSize) || 1;
  const paginatedStudents = filteredStudents.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div>
      {/* Header Banner */}
      <div className="page-header">
        <div className="page-title-group">
          <h1>Student Directory</h1>
          <p className="page-subtitle">Manage, view, and organize all registered academic students.</p>
        </div>

        <button className="btn btn-primary" onClick={() => navigate("/register")}>
          <Plus style={{ width: 16, height: 16 }} />
          <span>Add New Student</span>
        </button>
      </div>

      {/* Main Table Card */}
      <div className="card">
        {/* Toolbar Controls */}
        <div
          style={{
            display: "flex",
            justify: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 14,
            marginBottom: 20,
          }}
        >
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", flex: 1 }}>
            {/* Search input */}
            <div style={{ position: "relative", width: 260 }}>
              <Search
                style={{
                  position: "absolute",
                  left: 12,
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--text-muted)",
                  width: 16,
                  height: 16,
                }}
              />
              <input
                className="form-input"
                style={{ paddingLeft: 36 }}
                placeholder="Search name, ID, or email..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>

            {/* Department filter */}
            <select
              className="form-select"
              style={{ width: 180 }}
              value={deptFilter}
              onChange={(e) => {
                setDeptFilter(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="">All Departments</option>
              {departments.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>

            {/* Year filter */}
            <select
              className="form-select"
              style={{ width: 160 }}
              value={yearFilter}
              onChange={(e) => {
                setYearFilter(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="">All Year Levels</option>
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>

          <div style={{ fontSize: 13, color: "var(--text-muted)", fontWeight: 600 }}>
            Showing {filteredStudents.length} {filteredStudents.length === 1 ? "student" : "students"}
          </div>
        </div>

        {/* Table View */}
        {loading ? (
          <div style={{ textAlign: "center", padding: "40px 0", color: "var(--text-muted)" }}>
            Loading student records...
          </div>
        ) : filteredStudents.length === 0 ? (
          <div style={{ textAlign: "center", padding: "48px 0", color: "var(--text-muted)" }}>
            <Users style={{ width: 40, height: 40, opacity: 0.4, marginBottom: 12 }} />
            <h4 style={{ fontSize: 15, fontWeight: 700, color: "var(--text-primary)" }}>
              No Students Found
            </h4>
            <p style={{ fontSize: 13, marginTop: 4 }}>
              Try adjusting your search criteria or clear filters.
            </p>
          </div>
        ) : (
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Student ID</th>
                  <th>Student Profile</th>
                  <th>Department</th>
                  <th>Year</th>
                  <th>Status</th>
                  <th>Registered Date</th>
                  <th style={{ textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedStudents.map((student) => (
                  <tr key={student.id}>
                    <td>
                      <span className="badge badge-plum">{student.student_id}</span>
                    </td>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div
                          style={{
                            width: 36,
                            height: 36,
                            borderRadius: "50%",
                            background: getAvatarColor(student.full_name),
                            color: "#FFFFFF",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 13,
                            fontWeight: 700,
                            flexShrink: 0,
                          }}
                        >
                          {getInitials(student.full_name)}
                        </div>
                        <div>
                          <div style={{ fontWeight: 700, color: "var(--text-primary)" }}>
                            {student.full_name}
                          </div>
                          <div style={{ fontSize: 11.5, color: "var(--text-muted)" }}>
                            {student.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="badge badge-sage">{student.department || "Unassigned"}</span>
                    </td>
                    <td>{student.year || "-"}</td>
                    <td>
                      <span className="badge badge-sage">Active</span>
                    </td>
                    <td>{formatDate(student.created_at)}</td>
                    <td>
                      <div style={{ display: "flex", gap: 6, justifyContent: "flex-end" }}>
                        <button
                          className="btn btn-secondary btn-sm btn-icon-only"
                          title="View Profile"
                          onClick={() => navigate(`/students/${student.id}`)}
                        >
                          <Eye style={{ width: 15, height: 15 }} />
                        </button>
                        <button
                          className="btn btn-secondary btn-sm btn-icon-only"
                          title="Edit Details"
                          onClick={() => navigate(`/students/${student.id}/edit`)}
                        >
                          <Edit style={{ width: 15, height: 15 }} />
                        </button>
                        <button
                          className="btn btn-secondary btn-sm btn-icon-only"
                          title="Delete Student"
                          style={{ color: "var(--status-danger)" }}
                          onClick={() => setDeleteTarget(student)}
                        >
                          <Trash2 style={{ width: 15, height: 15 }} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Bar */}
        {!loading && filteredStudents.length > pageSize && (
          <div
            style={{
              display: "flex",
              justify: "space-between",
              alignItems: "center",
              marginTop: 20,
              paddingTop: 16,
              borderTop: "1px solid var(--border-subtle)",
            }}
          >
            <span style={{ fontSize: 12.5, color: "var(--text-muted)" }}>
              Page {currentPage} of {totalPages}
            </span>

            <div style={{ display: "flex", gap: 8 }}>
              <button
                className="btn btn-secondary btn-sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              >
                <ChevronLeft style={{ width: 14, height: 14 }} />
                <span>Previous</span>
              </button>
              <button
                className="btn btn-secondary btn-sm"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              >
                <span>Next</span>
                <ChevronRight style={{ width: 14, height: 14 }} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Confirmation Modal for Deletion */}
      <ConfirmDialog
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={confirmDeleteStudent}
        title="Delete Student Record"
        message={`Are you sure you want to delete ${deleteTarget?.full_name} (${deleteTarget?.student_id})? This action cannot be undone.`}
        confirmText="Delete Student"
        isDangerous={true}
      />
    </div>
  );
}

export default StudentList;
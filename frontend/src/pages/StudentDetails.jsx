import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getStudent } from "../services/api";

function StudentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStudent(id)
      .then((res) => setStudent(res.data))
      .catch(() => setStudent(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="muted">Loading...</p>;
  if (!student) return <p className="muted">Student not found.</p>;

  return (
    <div>
      <div className="page-header">
        <h1>Student Details</h1>
        <p className="page-subtitle">Full profile for {student.full_name}</p>
      </div>

      <div className="card profile-card">
        <div className="profile-avatar">{student.full_name.charAt(0).toUpperCase()}</div>
        <div className="profile-info">
          <h2>{student.full_name}</h2>
          <p className="muted">{student.student_id}</p>

          <div className="detail-grid">
            <div>
              <span className="detail-label">Email</span>
              <p>{student.email}</p>
            </div>
            <div>
              <span className="detail-label">Phone</span>
              <p>{student.phone || "-"}</p>
            </div>
            <div>
              <span className="detail-label">Gender</span>
              <p>{student.gender || "-"}</p>
            </div>
            <div>
              <span className="detail-label">Department</span>
              <p>{student.department || "-"}</p>
            </div>
            <div>
              <span className="detail-label">Year</span>
              <p>{student.year || "-"}</p>
            </div>
            <div>
              <span className="detail-label">Date of Birth</span>
              <p>{student.dob || "-"}</p>
            </div>
          </div>

          <div className="form-actions">
            <button className="btn btn-secondary" onClick={() => navigate("/students")}>
              ← Back to List
            </button>
            <button className="btn btn-primary" onClick={() => navigate(`/students/${student.id}/edit`)}>
              ✏ Edit Student
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentDetails;
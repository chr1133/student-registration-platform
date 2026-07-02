import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import StudentForm from "../components/StudentForm";
import { getStudent, updateStudent } from "../services/api";

function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStudent(id)
      .then((res) => setStudent(res.data))
      .catch(() => setStudent(null))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (formData) => {
    try {
      await updateStudent(id, formData);
      setMessage({ type: "success", text: "Student updated successfully!" });
      setTimeout(() => navigate(`/students/${id}`), 1000);
    } catch (err) {
      setMessage({ type: "error", text: err.response?.data?.message || "Something went wrong" });
    }
  };

  if (loading) return <p className="muted">Loading...</p>;
  if (!student) return <p className="muted">Student not found.</p>;

  return (
    <div>
      <div className="page-header">
        <h1>Edit Student</h1>
        <p className="page-subtitle">Update details for {student.full_name}</p>
      </div>

      {message && <div className={`alert alert-${message.type}`}>{message.text}</div>}

      <div className="card">
        <StudentForm initialData={student} onSubmit={handleSubmit} submitLabel="Update Student" />
      </div>
    </div>
  );
}

export default EditStudent;
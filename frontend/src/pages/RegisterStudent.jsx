import { useNavigate } from "react-router-dom";
import StudentForm from "../components/StudentForm";
import { createStudent } from "../services/api";
import { useState } from "react";

function RegisterStudent() {
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);

  const handleSubmit = async (formData) => {
    try {
      await createStudent(formData);
      setMessage({ type: "success", text: "Student registered successfully!" });
      setTimeout(() => navigate("/students"), 1000);
    } catch (err) {
      setMessage({ type: "error", text: err.response?.data?.message || "Something went wrong" });
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1>Register Student</h1>
        <p className="page-subtitle">Fill in the details below to add a new student.</p>
      </div>

      {message && <div className={`alert alert-${message.type}`}>{message.text}</div>}

      <div className="card">
        <StudentForm onSubmit={handleSubmit} submitLabel="Save Student" />
      </div>
    </div>
  );
}

export default RegisterStudent;
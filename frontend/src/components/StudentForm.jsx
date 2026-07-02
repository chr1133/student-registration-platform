import { useState, useEffect } from "react";

const emptyForm = {
  student_id: "",
  full_name: "",
  email: "",
  phone: "",
  gender: "",
  department: "",
  year: "",
  dob: "",
};

function StudentForm({ initialData, onSubmit, submitLabel = "Save" }) {
  const [formData, setFormData] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({ ...emptyForm, ...initialData });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.student_id.trim()) newErrors.student_id = "Student ID is required";
    if (!formData.full_name.trim()) newErrors.full_name = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = "Email is invalid";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  const handleReset = () => {
    setFormData(initialData ? { ...emptyForm, ...initialData } : emptyForm);
    setErrors({});
  };

  return (
    <form className="student-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <div className="form-group">
          <label>Student ID</label>
          <input name="student_id" value={formData.student_id} onChange={handleChange} placeholder="e.g. STU-2026-001" />
          {errors.student_id && <span className="error-text">{errors.student_id}</span>}
        </div>

        <div className="form-group">
          <label>Full Name</label>
          <input name="full_name" value={formData.full_name} onChange={handleChange} placeholder="e.g. Abebe Kebede" />
          {errors.full_name && <span className="error-text">{errors.full_name}</span>}
        </div>

        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="e.g. abebe@example.com" />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label>Phone</label>
          <input name="phone" value={formData.phone} onChange={handleChange} placeholder="e.g. 0911223344" />
        </div>

        <div className="form-group">
          <label>Gender</label>
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div className="form-group">
          <label>Department</label>
          <select name="department" value={formData.department} onChange={handleChange}>
            <option value="">Select</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Electrical Engineering">Electrical Engineering</option>
            <option value="Business">Business</option>
            <option value="Medicine">Medicine</option>
            <option value="Law">Law</option>
          </select>
        </div>

        <div className="form-group">
          <label>Year</label>
          <select name="year" value={formData.year} onChange={handleChange}>
            <option value="">Select</option>
            <option value="1st Year">1st Year</option>
            <option value="2nd Year">2nd Year</option>
            <option value="3rd Year">3rd Year</option>
            <option value="4th Year">4th Year</option>
          </select>
        </div>

        <div className="form-group">
          <label>Date of Birth</label>
          <input type="date" name="dob" value={formData.dob} onChange={handleChange} />
        </div>
      </div>

      <div className="form-actions">
        <button type="button" className="btn btn-secondary" onClick={handleReset}>
          Reset
        </button>
        <button type="submit" className="btn btn-primary">
          {submitLabel}
        </button>
      </div>
    </form>
  );
}

export default StudentForm;
const db = require("../config/db");

const getAllStudents = () => {
  return db.prepare("SELECT * FROM students ORDER BY id DESC").all();
};

const getStudentById = (id) => {
  return db.prepare("SELECT * FROM students WHERE id = ?").get(id);
};

const createStudent = (student) => {
  const stmt = db.prepare(`
    INSERT INTO students (student_id, full_name, email, phone, gender, department, year, dob)
    VALUES (@student_id, @full_name, @email, @phone, @gender, @department, @year, @dob)
  `);
  const result = stmt.run(student);
  return getStudentById(result.lastInsertRowid);
};

const updateStudent = (id, student) => {
  const stmt = db.prepare(`
    UPDATE students SET
      student_id = @student_id,
      full_name = @full_name,
      email = @email,
      phone = @phone,
      gender = @gender,
      department = @department,
      year = @year,
      dob = @dob
    WHERE id = @id
  `);
  stmt.run({ ...student, id });
  return getStudentById(id);
};

const deleteStudent = (id) => {
  return db.prepare("DELETE FROM students WHERE id = ?").run(id);
};

const getStats = () => {
  const total = db.prepare("SELECT COUNT(*) AS count FROM students").get().count;
  const departments = db
    .prepare("SELECT COUNT(DISTINCT department) AS count FROM students WHERE department IS NOT NULL AND department != ''")
    .get().count;
  const recent = db.prepare("SELECT * FROM students ORDER BY id DESC LIMIT 5").all();
  return { total, departments, recent };
};

module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  getStats,
};
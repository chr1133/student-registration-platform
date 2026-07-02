const studentModel = require("../models/studentModel");

const getStudents = (req, res) => {
  try {
    const students = studentModel.getAllStudents();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getStudent = (req, res) => {
  try {
    const student = studentModel.getStudentById(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addStudent = (req, res) => {
  try {
    const { student_id, full_name, email, phone, gender, department, year, dob } = req.body;

    if (!student_id || !full_name || !email) {
      return res.status(400).json({ message: "Student ID, Full Name and Email are required" });
    }

    const existing = studentModel.getAllStudents().find((s) => s.student_id === student_id);
    if (existing) {
      return res.status(409).json({ message: "That Student ID is already registered" });
    }

    const newStudent = studentModel.createStudent({
      student_id,
      full_name,
      email,
      phone: phone || "",
      gender: gender || "",
      department: department || "",
      year: year || "",
      dob: dob || "",
    });

    res.status(201).json(newStudent);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const editStudent = (req, res) => {
  try {
    const existing = studentModel.getStudentById(req.params.id);
    if (!existing) return res.status(404).json({ message: "Student not found" });

    const { student_id, full_name, email, phone, gender, department, year, dob } = req.body;

    const updated = studentModel.updateStudent(req.params.id, {
      student_id, full_name, email, phone, gender, department, year, dob,
    });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const removeStudent = (req, res) => {
  try {
    const existing = studentModel.getStudentById(req.params.id);
    if (!existing) return res.status(404).json({ message: "Student not found" });

    studentModel.deleteStudent(req.params.id);
    res.json({ message: "Student deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getStats = (req, res) => {
  try {
    const stats = studentModel.getStats();
    res.json(stats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getStudents, getStudent, addStudent, editStudent, removeStudent, getStats,
};
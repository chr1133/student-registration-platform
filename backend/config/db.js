const Database = require("better-sqlite3");
const path = require("path");

const db = new Database(path.join(__dirname, "..", "students.db"));

db.exec(`
  CREATE TABLE IF NOT EXISTS students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id TEXT NOT NULL,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    gender TEXT,
    department TEXT,
    year TEXT,
    dob TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  )
`);

module.exports = db;
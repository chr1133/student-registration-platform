const express = require("express");
const router = express.Router();
const {
  getStudents, getStudent, addStudent, editStudent, removeStudent, getStats,
} = require("../controllers/studentController");

router.get("/stats", getStats); // must come before /:id
router.get("/", getStudents);
router.get("/:id", getStudent);
router.post("/", addStudent);
router.put("/:id", editStudent);
router.delete("/:id", removeStudent);

module.exports = router;
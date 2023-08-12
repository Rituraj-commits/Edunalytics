const { Router } = require("express");
const Student = require("../database/schemas/student");
const { hashPassword, comparePassword } = require("../utils/password");

const router = Router();

router.post("/login", async (req, res) => {
  const { student_id, email, password } = req.body;
  if (!student_id || !email || !password)
    return res.status(400).json({ message: "Missing required fields" });
  const userDB = await Student.findOne({ student_id });
  if (!userDB) return res.status(400).json({ message: "User not found" });
  const isValid = comparePassword(password, userDB.password);
  if (!isValid) {
    return res.send(
      '<script>alert("Invalid password"); window.location.href="/student/login.html";</script>'
    );
  } else {
    return res.redirect(
      `/student/results.html?student_id=${userDB.student_id}`
    );
  }
});

router.post("/forgot-password", async (req, res) => {
  const { student_id, new_password, re_password } = req.body;
  if (!student_id || !new_password || !re_password)
    return res.status(400).json({ message: "Missing required fields" });
  const userDB = await Student.findOne({ student_id });
  if (!userDB) return res.status(400).json({ message: "User not found" });

  if (!(new_password === re_password)) {
    return res.send(
      '<script>alert("Passwords do not match"); window.location.href="/student/forgot-password.html";</script>'
    );
  } else {
    const hashedPassword = hashPassword(new_password);
    try {
      userDB.password = hashedPassword;
      await userDB.save();

      // Password updated successfully
      return res.redirect("student.html");
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error updating password in the database" });
    }
  }
});

router.post("/results", async (req, res) => {
  try {
    const student = await Student.findOne({ student_id: req.body.student_id });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    return res.status(200).json({ student });
  } catch (error) {
    console.error("Error fetching results:", error);
    return res.status(500).json({ message: "Error fetching results" });
  }
});

module.exports = router;
const { Router } = require("express");
const Student = require("../database/schemas/student");
const Admin = require("../database/schemas/admin");
const { hashPassword, comparePassword } = require("../utils/password");

const router = Router();

router.post("/new_admin", async (req, res) => {
  const { admin_id, email, password } = req.body;
  if (!admin_id || !email || !password)
    return res.status(400).json({ message: "Missing required fields" });
  const userDB = await Admin.findOne({ admin_id });
  if (userDB) return res.status(400).json({ message: "User already exists" });
  const hashedPassword = hashPassword(password);
  const newUser = new Admin({
    admin_id,
    email,
    password: hashedPassword,
  });
  await newUser.save();
  return res.redirect("admin.html");
});

router.post("/login", async (req, res) => {
  const { admin_id, email, password } = req.body;
  if (!admin_id || !email || !password)
    return res.status(400).json({ message: "Missing required fields" });
  const userDB = await Admin.findOne({ admin_id });
  if (!userDB) return res.status(400).json({ message: "User not found" });
  const isValid = comparePassword(password, userDB.password);
  if (!isValid) {
    return res.send(
      '<script>alert("Invalid password"); window.location.href="/admin/login.html";</script>'
    );
  } else {
    return res.redirect("login.html");
  }
});

router.post("/forgot-password", async (req, res) => {
  const { admin_id, new_password, re_password } = req.body;
  if (!admin_id || !new_password || !re_password)
    return res.status(400).json({ message: "Missing required fields" });
  const userDB = await Admin.findOne({ admin_id });
  if (!userDB) return res.status(400).json({ message: "User not found" });

  if (!(new_password === re_password)) {
    return res.send(
      '<script>alert("Passwords do not match"); window.location.href="/admin/forgot-password.html";</script>'
    );
  } else {
    const hashedPassword = hashPassword(new_password);
    try {
      userDB.password = hashedPassword;
      await userDB.save();

      // Password updated successfully
      return res.redirect("admin.html");
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error updating password in the database" });
    }
  }
});

router.post("/handle-button", async (req, res) => {
  const buttonId = req.body.buttonId;
  switch (buttonId) {
    case "button1":
      console.log("Button 1 clicked");
      res.redirect("results.html");
      break;
    case "button2":
      console.log("Button 2 clicked");
      return res.redirect("add_student.html");
    case "button3":
      console.log("Button 2 clicked");
      return res.redirect("edit_results.html");
    default:
      console.log("No button clicked");
      return res.sendStatus(400);
  }
});

router.post("/add_student", async (req, res) => {
  try {
    const {
      student_id,
      email,
      password,
      physics,
      chemistry,
      maths,
      biology,
      english,
    } = req.body;
    if (
      !student_id ||
      !email ||
      !password ||
      !physics ||
      !chemistry ||
      !maths ||
      !biology ||
      !english
    )
      return res.status(400).json({ message: "Missing required fields" });

    const newStudent = new Student({
      student_id: student_id,
      email: email,
      password: hashPassword(password),
      physics: physics,
      chemistry: chemistry,
      maths: maths,
      biology: biology,
      english: english,
    });

    const savedStudent = await newStudent.save();
    return res.send(
      '<script>alert("Student added successfully"); window.location.href="/admin/add_student.html";</script>'
    );
  } catch (err) {
    console.log(err);
    return res.send(401);
  }
});

router.post("/edit_result", async (req, res) => {
  try {
    const { student_id, physics, chemistry, maths, biology, english } =
      req.body;
    if (!student_id || !physics || !chemistry || !maths || !biology || !english)
      return res.status(400).json({ message: "Missing required fields" });

    const student = await Student.findOne({ student_id: student_id });
    if (!student) return res.status(400).json({ message: "Student not found" });

    student.physics = physics;
    student.chemistry = chemistry;
    student.maths = maths;
    student.biology = biology;
    student.english = english;

    const updatedStudent = await student.save();
    return res.send(
      '<script>alert("Student result updated successfully"); window.location.href="/admin/edit_results.html";</script>'
    );
  } catch (err) {
    console.log(err);
    return res.send(401).json({ message: "Error updating student result" });
  }
});

router.get("/results", async (req, res) => {
  try {
    const students = await Student.find();
    return res.status(200).json({ students });
  } catch (err) {
    console.log(err);
    return res.send(401).json({ message: "Error fetching results" });
  }
});

module.exports = router;
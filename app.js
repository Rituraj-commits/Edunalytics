const express = require("express");
const bodyParser = require("body-parser");

require("./database/mongo");

const app = express();
const PORT = 3000;

app.use(express.static("admin"));
app.use(express.static("student"));
app.use(express.static(__dirname));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Create separate routers for admin and student login routes
const adminRouter = require("./admin/adminRoutes");
const studentRouter = require("./student/studentRoutes");

// Use route prefixes to differentiate admin and student routes
app.use("/admin", adminRouter);
app.use("/student", studentRouter);

app.get("/", (req, res) => {
  res.redirect("/home.html");
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`));

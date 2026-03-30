const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const SECRET = "mysecretkey";

/*
========================================
🧱 IN-MEMORY STORAGE
========================================
*/
let users = [];
let jobs = [];
let applications = [];

/*
========================================
🔐 AUTH MIDDLEWARE
========================================
*/
function authMiddleware(req, res, next) {
  const token = req.headers["authorization"];

  if (!token) return res.status(401).json({ message: "No token" });

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

/*
========================================
👤 REGISTER
========================================
*/
app.post("/api/register", async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = {
    id: Date.now(),
    name,
    email,
    password: hashedPassword
  };

  users.push(user);

  res.json({ message: "User registered ✅" });
});

/*
========================================
🔑 LOGIN
========================================
*/
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email);

  if (!user) return res.status(404).json({ message: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) return res.status(401).json({ message: "Invalid password" });

  const token = jwt.sign(
    { id: user.id, email: user.email },
    SECRET,
    { expiresIn: "1d" }
  );

  res.json({ message: "Login success ✅", token });
});

/*
========================================
👥 USERS API (FOR DASHBOARD)
========================================
*/

// Get all users
app.get("/api/users", (req, res) => {
  const cleanUsers = users.map(u => ({
    id: u.id,
    name: u.name,
    email: u.email,
    status: "active",
    date: new Date(u.id)
  }));

  res.json(cleanUsers);
});

// Add user (dashboard use)
app.post("/api/users", (req, res) => {
  const { name, email } = req.body;

  const user = {
    id: Date.now(),
    name,
    email,
    password: "dashboard_user"
  };

  users.push(user);

  res.json(user);
});

/*
========================================
💼 JOB APIs
========================================
*/

// Post job (protected)
app.post("/api/jobs", authMiddleware, (req, res) => {
  const { title, company, location, salary } = req.body;

  const job = {
    id: Date.now(),
    title,
    company,
    location,
    salary,
    userId: req.user.id,
    createdAt: new Date()
  };

  jobs.push(job);

  res.json({ message: "Job posted ✅", job });
});

// Get all jobs (public)
app.get("/api/jobs", (req, res) => {
  res.json(jobs);
});

/*
========================================
📩 APPLY JOB
========================================
*/
app.post("/api/apply", authMiddleware, (req, res) => {
  const { jobId } = req.body;

  const application = {
    id: Date.now(),
    jobId,
    userId: req.user.id,
    appliedAt: new Date()
  };

  applications.push(application);

  res.json({ message: "Applied successfully ✅" });
});

/*
========================================
🚀 START SERVER
========================================
*/
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

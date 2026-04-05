const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*
========================================
🧱 TEMP DATABASE (IN-MEMORY STORAGE)
========================================
*/
let users = [];
let jobs = [];
let applications = [];

/*
========================================
🚀 HEALTH CHECK
========================================
*/
app.get("/", (req, res) => {
  res.send("API running 🚀");
});

/*
========================================
👤 USER APIs (OLD - KEEP FOR NOW)
========================================
*/

// Add user
app.post("/api/add", (req, res) => {
  const { name, email } = req.body;

  const user = {
    id: Date.now(),
    name,
    email
  };

  users.push(user);

  res.json({ message: "User added ✅", user });
});

// Get users
app.get("/api/users", (req, res) => {
  res.json(users);
});

/*
========================================
💼 JOB APIs (MAIN FEATURE)
========================================
*/

// Post job
app.post("/api/jobs", (req, res) => {
  const { title, company, location, salary, description } = req.body;

  const job = {
    id: Date.now(),
    title,
    company,
    location,
    salary,
    description,
    createdAt: new Date()
  };

  jobs.push(job);

  res.json({ message: "Job posted ✅", job });
});

// Get all jobs
app.get("/api/jobs", (req, res) => {
  res.json(jobs);
});

// Delete job
app.delete("/api/jobs/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const index = jobs.findIndex(j => j.id === id);

  if (index !== -1) {
    jobs.splice(index, 1);
    return res.json({ message: "Job deleted ✅" });
  }

  res.status(404).json({ message: "Job not found" });
});

/*
========================================
📩 APPLICATION APIs
========================================
*/

// Apply to job
app.post("/api/apply", (req, res) => {
  const { jobId, name, email } = req.body;

  const application = {
    id: Date.now(),
    jobId,
    name,
    email,
    appliedAt: new Date()
  };

  applications.push(application);

  res.json({ message: "Applied successfully ✅", application });
});

// Get all applications
app.get("/api/applications", (req, res) => {
  res.json(applications);
});

/*
========================================
🔍 SEARCH JOBS
========================================
*/
app.get("/api/jobs/search", (req, res) => {
  const keyword = req.query.keyword?.toLowerCase() || "";

  const filtered = jobs.filter(j =>
    j.title.toLowerCase().includes(keyword) ||
    j.company.toLowerCase().includes(keyword) ||
    j.location.toLowerCase().includes(keyword)
  );

  res.json(filtered);
});

/*
========================================
🚀 START SERVER
========================================
*/
app.listen(5000, () => {
  console.log("✅ Server running on port 5000");
});

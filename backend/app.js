const express = require("express");
const mysql = require("mysql2");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

function connectWithRetry() {
  const db = mysql.createConnection({
    host: process.env.DB_HOST || "db",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "root",
    database: process.env.DB_NAME || "mmui"
  });

  db.connect(err => {
    if (err) {
      console.log("DB not ready, retrying in 3s...", err.code);
      setTimeout(connectWithRetry, 3000);
      return;
    }
    console.log("MySQL connected ✅");
    startServer(db);
  });
}

function startServer(db) {
  app.get("/", (req, res) => res.send("API running 🚀"));

  app.post("/api/add", (req, res) => {
    const { name, email } = req.body;
    db.query("INSERT INTO users (name, email) VALUES (?, ?)", [name, email], (err) => {
      if (err) return res.send(err);
      res.send("User added ✅");
    });
  });

  app.get("/api/users", (req, res) => {
    db.query("SELECT * FROM users", (err, result) => {
      if (err) return res.send(err);
      res.json(result);
    });
  });

  app.listen(5000, () => console.log("Server running on 5000"));
}

connectWithRetry();

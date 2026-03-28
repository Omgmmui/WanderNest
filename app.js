const mysql = require("mysql2");

function connectWithRetry() {
  const db = mysql.createConnection({
    host: "db",
    user: "root",
    password: "yourpassword",
    database: "mmui",
  });

  db.connect((err) => {
    if (err) {
      console.log("DB not ready, retrying in 3s...", err.code);
      setTimeout(connectWithRetry, 3000);
    } else {
      console.log("DB connected ✅");
      startServer(db);
    }
  });
}

function startServer(db) {
  // all your routes go here, using db
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

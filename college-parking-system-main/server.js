const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",   // put your MySQL password
  database: "college_parking"
});

db.connect(err => {
  if (err) throw err;
  console.log("✅ MySQL Connected...");
});

// Route: Save contact form
app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body;
  const sql = "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)";
  db.query(sql, [name, email, message], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send({ success: true, message: "Message saved!" });
  });
});

// Route: Get available slots
app.get("/api/slots", (req, res) => {
  db.query("SELECT * FROM parking_slots", (err, results) => {
    if (err) return res.status(500).send(err);
    res.send(results);
  });
});

// Route: Book a slot
app.post("/api/reserve", (req, res) => {
  const { user_name, vehicle_number, slot_id } = req.body;

  // First check if slot is available
  db.query("SELECT * FROM parking_slots WHERE id=? AND status='available'", [slot_id], (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.length === 0) {
      return res.status(400).send({ success: false, message: "Slot not available" });
    }

    // Insert reservation
    db.query("INSERT INTO reservations (user_name, vehicle_number, slot_id) VALUES (?, ?, ?)", 
      [user_name, vehicle_number, slot_id], (err, result) => {
      if (err) return res.status(500).send(err);

      // Update slot status
      db.query("UPDATE parking_slots SET status='booked' WHERE id=?", [slot_id]);

      res.send({ success: true, message: "Slot reserved!" });
    });
  });
});

app.listen(5000, () => console.log("🚀 Server running on http://localhost:5000"));

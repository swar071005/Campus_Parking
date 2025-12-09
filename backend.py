from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

DATABASE = "database.db"


def get_db():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn


@app.route("/")
def home():
    return jsonify({"message": "Campus Parking Backend Running"})


# Register a vehicle
@app.route("/register", methods=["POST"])
def register_vehicle():
    data = request.json
    name = data.get("name")
    vehicle_no = data.get("vehicle_no")
    slot = data.get("slot")

    conn = get_db()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO parking (name, vehicle_no, slot) VALUES (?, ?, ?)",
        (name, vehicle_no, slot),
    )
    conn.commit()
    conn.close()

    return jsonify({"status": "success", "message": "Vehicle Registered"})


# Fetch all parked vehicles
@app.route("/vehicles", methods=["GET"])
def get_vehicles():
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM parking")
    vehicles = cursor.fetchall()
    conn.close()

    return jsonify([dict(row) for row in vehicles])


# Delete a vehicle
@app.route("/delete/<int:id>", methods=["DELETE"])
def delete_vehicle(id):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM parking WHERE id = ?", (id,))
    conn.commit()
    conn.close()

    return jsonify({"status": "success", "message": "Vehicle deleted"})


if __name__ == "__main__":
    app.run(debug=True)

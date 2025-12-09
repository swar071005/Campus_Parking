import sqlite3

conn = sqlite3.connect("database.db")
cursor = conn.cursor()

cursor.execute("""
CREATE TABLE IF NOT EXISTS parking (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    vehicle_no TEXT NOT NULL,
    slot TEXT NOT NULL
)
""")

conn.commit()
conn.close()

print("Database created successfully")

import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';

const app = express();
app.use(cors());

// Create a connection pool to handle reconnects automatically
const db = mysql.createPool({
    connectionLimit: 10, // Adjust based on load
    host: "localhost",
    port: 3306,
    user: "root",
    password: "sreej@02",
    database: "xyzcompany_db"
});

// Check database connection
db.getConnection((err, connection) => {
    if (err) {
        console.error("Database connection failed:", err);
    } else {
        console.log("Connected to MySQL Server");
       
    }
});

app.get("/depts", (request, response) => {
    const sql = "SELECT * FROM dept";
    db.query(sql, (err, data) => {
        if (err) {
            console.error("Query Error:", err);
            return response.status(500).json({ error: "Database query failed" });
        }
        return response.json(data);
    });
});

app.get("/", (request, response) => {
    return response.json("From BackEnd");
});

app.listen(8080, () => {
    console.log("Server running on port 8080");
});



import express from "express";
export const app = express();
import bodyParser from "body-parser";
import fs from "fs";
const jsonParser = bodyParser.json();
const fileName = "src/server/students.json";

if (!process.env["VITE"]) {
  const frontendFiles = process.cwd() + "/dist";
  app.use(express.static(frontendFiles));
  app.get("/*", (_, res) => {
    res.send(frontendFiles + "/index.html");
  });
  app.listen(process.env["PORT"]);
}

// Use bodyParser middleware to parse JSON data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//mysql configuration
import mysql from "mysql";
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "lavarel-test",
});
// Connect to the MySQL database
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL");
});

app.get("/api/test", (_, res) => res.json({ greeting: "Hello i am working" }));

// Define the type for your data
interface StudentData {
  name: string;
  IDno: string;
  courses: string[];
}

// Load data from file
let rawData: Buffer;
let data: StudentData[]; // Initialize data as an array

try {
  rawData = fs.readFileSync(fileName);
  data = JSON.parse(rawData.toString()) as StudentData[];
} catch (err) {
  console.error("Error loading data from file:", err);
  data = []; // Initialize data as an empty array when there's an error reading the file
}

// This is a RESTful GET web service
app.get("/students", (request, res) => {
  let sql = "SELECT * FROM students";
  connection.query(sql, function (err: any, data: any, fields: any) {
    if (err) throw err;
    data.sort((a: { name: string }, b: { name: string }) =>
      a.name > b.name ? 1 : -1
    );
    res.send(data);
    console.log(data);
  });
});

// Getting data from the form
app.post("/student_data", jsonParser, (req, res) => {
  const studentName = req.body.name;
  const ID_num = req.body.IDno;
  const courses = req.body.courses;

  console.log("Received data:", studentName, ID_num, courses);

  if (ID_num && studentName) {
    // Check if the student already exists in the database based on ID_no
    const checkDuplicateQuery = "SELECT * FROM students WHERE idNo = ?";
    connection.query(checkDuplicateQuery, [ID_num], (error, results) => {
      if (error) {
        throw error;
      }
      if (results.length === 0) {
        // The student doesn't exist, so insert them into the database
        const insertQuery =
          "INSERT INTO students (name, idNo, course) VALUES (?, ?, ?)";
        connection.query(
          insertQuery,
          [studentName, ID_num, courses.join("\n")],
          (err, result) => {
            if (err) {
              throw err;
            }
            data.push({ name: studentName, IDno: ID_num, courses: courses });
            fs.writeFileSync(fileName, JSON.stringify(data, null, 2));
            console.log("Records inserted: " + result.affectedRows);
            res.send("success");
          }
        );
      } else {
        // The student already exists in the database
        res.send("exists");
      }
    });
  } else {
    res.send("fail");
  }
});

process.on("exit", () => {
  connection.end();
  console.log("MySQL connection closed.");
});

// Handle any uncaught exceptions to ensure the connection is properly closed
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  connection.end(() => {
    process.exit(1);
  });
});

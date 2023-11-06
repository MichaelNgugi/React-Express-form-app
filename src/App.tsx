import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import StudentsTable from "./components/StudentsTable";
import "./App.css";

function App() {
  const [students, setStudents] = useState([]); // to be used to display the students table

  // to be used to display the students table
  useEffect(() => {
    fetchStudents();
  }, []);

  async function fetchStudents() {
    const url = "/students";
    const options = {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    };
    const response = await fetch(url, options);
    const studentsData = await response.json();
    setStudents(studentsData);
  }

  const [name, setName] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [serverResponse, setServerResponse] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Create a student object with the form data
    const student = {
      name: name,
      IDno: idNumber,
      courses: selectedCourses,
    };

    // Send a POST request to the server
    try {
      const response = await fetch("/student_data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(student),
      });

      var text = await response.text();
      if (text == "success") {
        alert("Details saved");
        // Clear the form fields after successful submission
        setName("");
        setIdNumber("");
        setSelectedCourses([]);
      } else if (text == "exists") {
        alert("Student id already in use");
      } else {
        setServerResponse("Details not saved. Please try again later.");
        setName("");
        setIdNumber("");
        setSelectedCourses([]);
      }
    } catch (error) {
      setServerResponse(
        "An error occurred. Please check your network connection."
      );
    }
  };

  return (
    <div className="App">
      <h2>Student Information</h2>
      <p className="read-the-docs">
        Fill out the information to add a student to the database.
      </p>
      <p className="read-the-docs">Server response: {serverResponse}</p>
      <div className="card">
        <form onSubmit={handleSubmit}>
          <p>
            Full Name: &nbsp; &nbsp;
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </p>
          <p>
            Student ID: &nbsp; &nbsp;
            <input
              type="text"
              value={idNumber}
              onChange={(e) => setIdNumber(e.target.value)}
              required
            />
          </p>
          <p className="read-the-docs">Courses Completed</p>
          <p>
            <input
              type="checkbox"
              name="course"
              value="APT"
              checked={selectedCourses.includes("APT")}
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedCourses([...selectedCourses, "APT"]);
                } else {
                  setSelectedCourses(
                    selectedCourses.filter((course) => course !== "APT")
                  );
                }
              }}
            />
            APT &nbsp;
            <input
              type="checkbox"
              name="course"
              value="IST"
              checked={selectedCourses.includes("IST")}
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedCourses([...selectedCourses, "IST"]);
                } else {
                  setSelectedCourses(
                    selectedCourses.filter((course) => course !== "IST")
                  );
                }
              }}
            />
            IST &nbsp;
            <input
              type="checkbox"
              name="course"
              value="IR"
              checked={selectedCourses.includes("IR")}
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedCourses([...selectedCourses, "IR"]);
                } else {
                  setSelectedCourses(
                    selectedCourses.filter((course) => course !== "IR")
                  );
                }
              }}
            />
            IR &nbsp;
            <input
              type="checkbox"
              name="course"
              value="BCOM"
              checked={selectedCourses.includes("BCOM")}
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedCourses([...selectedCourses, "BCOM"]);
                } else {
                  setSelectedCourses(
                    selectedCourses.filter((course) => course !== "BCOM")
                  );
                }
              }}
            />
            BCOM
          </p>
          {/* Add more checkboxes for other courses here */}
          <button id="save" type="submit">
            Submit
          </button>
        </form>
      </div>
      <hr></hr>
      <div>
        <StudentsTable students={students} />{" "}
        {/* Use the StudentsTable component here */}
      </div>
    </div>
  );
}

export default App;

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

//const form: HTMLFormElement | null = document.querySelector("form");

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

/*
if (form) {
  // You can now safely use the 'form' variable, which is of type HTMLFormElement.
  form.addEventListener("submit", (e) => {
    // Your form input elements
    var nameInput = document.getElementById("fname") as HTMLInputElement;
    var IDnoInput = document.getElementById("Idno") as HTMLInputElement;

    const coursesInput: string[] = getCheckedCourses();

    function getCheckedCourses(): string[] {
      const checkboxes = document.getElementsByName(
        "course"
      ) as NodeListOf<HTMLInputElement>;
      const selectedCourses = Array.from(checkboxes)
        .filter((checkbox) => checkbox.checked)
        .map((checkbox) => checkbox.value);

      return selectedCourses;
    }

    console.log("coursesInput:", coursesInput);
    console.log("Type of coursesInput:", typeof coursesInput);

    async function addStudent() {
      // Retrieve the form input values when the submit button is clicked
      var names = nameInput.value;
      var IDno = IDnoInput.value;
      var courses = coursesInput;

      const url = "/student_data";
      const student = {
        name: names,
        IDno: IDno,
        courses: courses,
      };
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(student),
      };

      const response = await fetch(url, options);
      var text;
      try {
        text = await response.text();
        if (text === "Success") {
          alert("Details saved");
        } else {
          alert("Details not saved. Please try again later.");
        }
      } catch (error) {
        alert("An error occurred. Please check your network connection.");
      }
    }

    if (nameInput && IDnoInput) {
      //IDnoInput = parseInt(IDnoInput);
      addStudent();
    }

    e.preventDefault();
  });
}
*/

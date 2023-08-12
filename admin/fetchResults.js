// fetchResults.js (client-side)
async function fetchResults() {
  try {
    const response = await fetch("http://localhost:3000/admin/results");
    const data = await response.json();

    if (!response.ok) {
      console.error("Error fetching results:", data.message);
      return;
    } else {
      console.log("Results fetched successfully");
    }

    const students = data.students;

    // Get the table body element to append rows
    const tableBody = document
      .getElementById("results-table")
      .getElementsByTagName("tbody")[0];

    // Clear any existing rows in the table body
    tableBody.innerHTML = "";

    // Loop through the students array and populate the table body with rows
    students.forEach((student) => {
      const row = tableBody.insertRow();
      row.insertCell().textContent = student.student_id;
      row.insertCell().textContent = student.physics;
      row.insertCell().textContent = student.chemistry;
      row.insertCell().textContent = student.maths;
      row.insertCell().textContent = student.biology;
      row.insertCell().textContent = student.english;
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

fetchResults();

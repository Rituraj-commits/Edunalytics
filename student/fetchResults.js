async function fetchResults() {
  document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const studentId = urlParams.get("student_id");

    if (studentId) {
      fetch(`/student/results`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ student_id: studentId }),
      })
        .then((response) => response.json())
        .then((data) => {
          const studentIdElement = document.querySelector(".student_id");
          studentIdElement.textContent = `${studentId}`;

          const marks1 = document.querySelector(".marks1");
          marks1.textContent = `${data.student.physics}`;

          const marks2 = document.querySelector(".marks2");
          marks2.textContent = `${data.student.chemistry}`;

          const marks3 = document.querySelector(".marks3");
          marks3.textContent = `${data.student.maths}`;

          const marks4 = document.querySelector(".marks4");
          marks4.textContent = `${data.student.biology}`;

          const marks5 = document.querySelector(".marks5");
          marks5.textContent = `${data.student.english}`;
        })
        .catch((error) => {
          console.error("Error fetching results:", error);
        });
    }
  });
}

fetchResults();

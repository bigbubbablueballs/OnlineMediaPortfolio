document.addEventListener("DOMContentLoaded", loadStudentTable);

async function loadStudentTable() {
  try {
    const response = await fetch("http://localhost:3000/students");
    const listOfStudents = await response.json();

    populateStudentTable(listOfStudents);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function populateStudentTable(students) {
  var tableBody = document.querySelector("#studentTable tbody");

  tableBody.innerHTML = "";

  students.forEach((student) => {
    var row = tableBody.insertRow();
    row.insertCell(0).textContent = student.id;
    row.insertCell(1).textContent = student.name;
    row.insertCell(2).textContent = student.age;
    row.insertCell(3).textContent = student.topics.join(", ");
    row.insertCell(4).innerHTML =
      '<button class="edit-btn" onclick="editUser(' +
      student.id +
      ')">Edit</button>';
    row.insertCell(5).innerHTML =
      '<button class="remove-btn" onclick="removeUser(' +
      student.id +
      ')">Remove</button>';
  });
}



async function addOrUpdateStudent() {
  const response = await fetch("http://localhost:3000/students");
  const listOfStudents = await response.json();

  const name = document.getElementById("name").value;
  const age = parseInt(document.getElementById("age").value, 10);
  const topics = document.getElementById("topics").value.split(",").map((topic) => topic.trim());

  let studentIdInput = document.getElementById("studentId");

  if (studentIdInput) {
    const studentId = parseInt(studentIdInput.value, 10);
    const existingStudentIndex = listOfStudents.findIndex((student) => student.id === studentId);

    if (existingStudentIndex !== -1) {
      listOfStudents[existingStudentIndex].name = name;
      listOfStudents[existingStudentIndex].age = age;
      listOfStudents[existingStudentIndex].topics = topics;

      await fetch(`http://localhost:3000/students/${studentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(listOfStudents[existingStudentIndex]),
      });
    }

    studentIdInput.remove();
  } else {
    const highestId = listOfStudents.reduce((max, student) => (student.id > max ? student.id : max), 0);

    const newStudent = {
      id: highestId + 1,
      name,
      age,
      topics,
    };

    await fetch("http://localhost:3000/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newStudent),
    });
  }

  document.getElementById("name").value = "";
  document.getElementById("age").value = "";
  document.getElementById("topics").value = "";

  loadStudentTable();
}






async function editUser(userId) {
  try {
    const response = await fetch(`http://localhost:3000/students/`);
    
    if (!response.ok) {
      throw new Error(`Error fetching student data: ${response.statusText}`);
    }

    const students = await response.json();
    const studentData = students.find(student => student.id === userId);

    if (!studentData) {
      throw new Error(`Student with ID ${userId} not found`);
    }

    document.getElementById("name").value = studentData.name;
    document.getElementById("age").value = studentData.age;
    document.getElementById("topics").value = studentData.topics.join(", ");

    let idInput = document.getElementById("studentId");
    if (!idInput) {
      idInput = document.createElement("input");
      idInput.type = "hidden";
      idInput.name = "id";
      idInput.id = "studentId";
      document.querySelector(".add-update-form").appendChild(idInput);
    }
    idInput.value = userId;

    const submitButton = document.querySelector(".edit-btn");
    submitButton.innerText = "Update";
    submitButton.onclick = addOrUpdateStudent;
  } catch (error) {
    console.error(error.message);
  }
}





async function removeUser(userId) {
  const confirmDelete = confirm("Are you sure you want to remove student " + userId + "?");

  if (confirmDelete) {
    const response = await fetch(`http://localhost:3000/students/${userId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      loadStudentTable();
    } else {
      console.error("Error deleting student:", response.statusText);
    }
  }
}

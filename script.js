// Get students from localStorage
let students = JSON.parse(localStorage.getItem("students")) || [];


// Form submit
document
    .getElementById("studentForm")
    .addEventListener("submit", function (event) {

        event.preventDefault();

        // Get values
        const id = document.getElementById("studentId").value.trim();
        const name = document.getElementById("studentName").value.trim();
        const course = document.getElementById("course").value;
        const semester = document.getElementById("semester").value;

        const dbms = Number(document.getElementById("dbms").value);
        const plsql = Number(document.getElementById("plsql").value);
        const python = Number(document.getElementById("python").value);
        const java = Number(document.getElementById("java").value);
        const web = Number(document.getElementById("web").value);


        // Check duplicate ID
        const duplicate = students.some(
            student => student.id === id
        );

        if (duplicate) {
            alert("Student ID already exists!");
            return;
        }


        // Store marks in array
        const marks = [
            dbms,
            plsql,
            python,
            java,
            web
        ];


        // Validate marks
        for (let mark of marks) {

            if (mark < 0 || mark > 100) {

                alert("Marks must be between 0 and 100.");

                return;
            }
        }


        // Calculate total
        const total = marks.reduce(
            (sum, mark) => sum + mark,
            0
        );


        // Calculate percentage
        const percentage = total / marks.length;


        // Calculate grade
        let grade;

        if (percentage >= 90) {
            grade = "A+";
        }
        else if (percentage >= 80) {
            grade = "A";
        }
        else if (percentage >= 70) {
            grade = "B";
        }
        else if (percentage >= 60) {
            grade = "C";
        }
        else if (percentage >= 50) {
            grade = "D";
        }
        else {
            grade = "F";
        }


        // Calculate result
        const result = marks.every(
            mark => mark >= 40
        )
            ? "PASS"
            : "FAIL";


        // Create student object
        const student = {

            id,
            name,
            course,
            semester,

            dbms,
            plsql,
            python,
            java,
            web,

            total,
            percentage,
            grade,
            result
        };


        // Add student
        students.push(student);


        // Save in localStorage
        saveStudents();


        // Reset form
        document.getElementById("studentForm").reset();


        // Update table
        displayStudents();


        alert("Student result added successfully!");

    });


// Save data
function saveStudents() {

    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );

}


// Display students
function displayStudents(list = students) {

    const tableBody =
        document.getElementById("studentTableBody");

    const emptyMessage =
        document.getElementById("emptyMessage");


    tableBody.innerHTML = "";


    if (list.length === 0) {

        emptyMessage.style.display = "block";

    }
    else {

        emptyMessage.style.display = "none";


        list.forEach(student => {

            const row =
                document.createElement("tr");


            row.innerHTML = `

                <td>${student.id}</td>

                <td>${student.name}</td>

                <td>${student.course}</td>

                <td>${student.semester}</td>

                <td>${student.total}/500</td>

                <td>
                    ${student.percentage.toFixed(2)}%
                </td>

                <td>
                    <strong>${student.grade}</strong>
                </td>

                <td>

                    <span class="${
                        student.result === "PASS"
                        ? "pass"
                        : "fail"
                    }">

                        ${student.result}

                    </span>

                </td>

                <td>

                    <button
                        class="view-btn"
                        onclick="viewResult('${student.id}')">
                        View
                    </button>

                    <button
                        class="delete-btn"
                        onclick="deleteStudent('${student.id}')">
                        Delete
                    </button>

                </td>

            `;


            tableBody.appendChild(row);

        });

    }


    updateDashboard();

}


// Update dashboard
function updateDashboard() {

    const total =
        students.length;


    const passed =
        students.filter(
            student => student.result === "PASS"
        ).length;


    const failed =
        students.filter(
            student => student.result === "FAIL"
        ).length;


    document.getElementById(
        "totalStudents"
    ).innerText = total;


    document.getElementById(
        "passedStudents"
    ).innerText = passed;


    document.getElementById(
        "failedStudents"
    ).innerText = failed;

}


// Search students
document
    .getElementById("searchInput")
    .addEventListener("input", function () {

        const searchValue =
            this.value.toLowerCase();


        const filteredStudents =
            students.filter(student =>

                student.id
                    .toLowerCase()
                    .includes(searchValue)

                ||

                student.name
                    .toLowerCase()
                    .includes(searchValue)

            );


        displayStudents(filteredStudents);

    });


// View result
function viewResult(id) {

    const student =
        students.find(
            student => student.id === id
        );


    if (!student) {
        return;
    }


    const resultDetails =
        document.getElementById("resultDetails");


    resultDetails.innerHTML = `

        <div class="result-box">

            <div class="result-row">
                <strong>Student ID</strong>
                <span>${student.id}</span>
            </div>

            <div class="result-row">
                <strong>Name</strong>
                <span>${student.name}</span>
            </div>

            <div class="result-row">
                <strong>Course</strong>
                <span>${student.course}</span>
            </div>

            <div class="result-row">
                <strong>Semester</strong>
                <span>${student.semester}</span>
            </div>

            <div class="result-row">
                <strong>DBMS</strong>
                <span>${student.dbms}</span>
            </div>

            <div class="result-row">
                <strong>PL/SQL</strong>
                <span>${student.plsql}</span>
            </div>

            <div class="result-row">
                <strong>Python</strong>
                <span>${student.python}</span>
            </div>

            <div class="result-row">
                <strong>Java</strong>
                <span>${student.java}</span>
            </div>

            <div class="result-row">
                <strong>Web Technology</strong>
                <span>${student.web}</span>
            </div>

            <div class="result-row">
                <strong>Total Marks</strong>
                <span>${student.total}/500</span>
            </div>

            <div class="result-row">
                <strong>Percentage</strong>
                <span>
                    ${student.percentage.toFixed(2)}%
                </span>
            </div>

            <div class="result-row">
                <strong>Grade</strong>
                <span class="grade">
                    ${student.grade}
                </span>
            </div>

            <div class="result-row">
                <strong>Result</strong>

                <span class="${
                    student.result === "PASS"
                    ? "pass"
                    : "fail"
                }">

                    ${student.result}

                </span>

            </div>

        </div>

    `;


    document.getElementById(
        "resultModal"
    ).style.display = "block";

}


// Delete student
function deleteStudent(id) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this student?"
        );


    if (!confirmDelete) {
        return;
    }


    students =
        students.filter(
            student => student.id !== id
        );


    saveStudents();

    displayStudents();

}


// Close modal
function closeModal() {

    document.getElementById(
        "resultModal"
    ).style.display = "none";

}


// Close modal by clicking outside
window.addEventListener(
    "click",
    function (event) {

        const modal =
            document.getElementById("resultModal");


        if (event.target === modal) {

            modal.style.display = "none";

        }

    }
);


// Display existing students on page load
displayStudents();
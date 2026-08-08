// ===============================
// RESIDENT DASHBOARD
// ===============================

document.addEventListener("DOMContentLoaded", function () {

    const user = JSON.parse(localStorage.getItem("loggedInUser"));

    // Check login
    if (!user || user.role !== "Resident") {
        window.location.href = "index.html";
        return;
    }

    // Display resident name
    const nameElement = document.getElementById("residentName");

    if (nameElement) {
        nameElement.textContent = user.name;
    }

    displayReports();
});


// ===============================
// DISPLAY REPORTS
// ===============================

function displayReports() {

    const user = JSON.parse(localStorage.getItem("loggedInUser"));

    let reports = JSON.parse(localStorage.getItem("reports")) || [];

    // Show only reports submitted by this resident
    const myReports = reports.filter(
        report => report.email === user.email
    );

    const container = document.getElementById("reportsList");

    if (!container) {
        return;
    }

    container.innerHTML = "";

    if (myReports.length === 0) {

        container.innerHTML =
            "<p>No reports submitted yet.</p>";

        return;
    }

    myReports.forEach(function (report) {

        const div = document.createElement("div");

        div.className = "report-card";

        div.innerHTML = `
            <h3>${report.title}</h3>

            <p>
                <strong>Category:</strong>
                ${report.category}
            </p>

            <p>
                <strong>Location:</strong>
                ${report.location}
            </p>

            <p>
                <strong>Description:</strong>
                ${report.description}
            </p>

            <p>
                <strong>Date:</strong>
                ${report.date}
            </p>

            <p>
                <strong>Status:</strong>
                ${report.status}
            </p>
        `;

        container.appendChild(div);
    });
}


// ===============================
// LOGOUT
// ===============================

function logout() {

    localStorage.removeItem("loggedInUser");

    window.location.href = "index.html";
}
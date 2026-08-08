function submitReport(event) {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const location = document.getElementById("location").value;
    const category = document.getElementById("category").value;

    if (title === "" || description === "" || location === "" || category === "") {
        document.getElementById("message").innerHTML =
            "<p style='color:red;'>Please fill all the fields.</p>";
        return;
    }

    const user = JSON.parse(localStorage.getItem("loggedInUser"));

const report = {
    title: title,
    description: description,
    location: location,
    category: category,
    status: "Pending",
    date: new Date().toLocaleString(),
    email: user.email,
    name: user.name
};

    let reports = JSON.parse(localStorage.getItem("reports")) || [];

    reports.push(report);

    localStorage.setItem("reports", JSON.stringify(reports));

    document.getElementById("message").innerHTML =
        "<p style='color:green;'>Report submitted successfully!</p>";

    document.querySelector("form").reset();
}
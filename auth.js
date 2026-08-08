// ===============================
// REGISTER
// ===============================

function registerUser(event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim().toLowerCase();
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;

    const message = document.getElementById("message");

    if (name === "" || email === "" || password === "" || role === "") {
        message.innerHTML =
            "<p style='color:red;'>Please fill all the fields.</p>";
        return;
    }

    // Check Gmail format
    if (!email.endsWith("@gmail.com")) {
        message.innerHTML =
            "<p style='color:red;'>Please enter a valid Gmail address.</p>";
        return;
    }

    // Get existing users
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Check whether account already exists
    const existingUser = users.find(user => user.email === email);

    if (existingUser) {
        message.innerHTML =
            "<p style='color:red;'>Account already exists!</p>";
        return;
    }

    // Create new user
    const user = {
        name: name,
        email: email,
        password: password,
        role: role
    };

    users.push(user);

    localStorage.setItem("users", JSON.stringify(users));

    message.innerHTML =
        "<p style='color:green;'>Registered successfully!</p>";

    document.querySelector("form").reset();
}


// ===============================
// LOGIN
// ===============================

function loginUser(event) {
    event.preventDefault();

    const email = document.getElementById("email").value.trim().toLowerCase();
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;

    const message = document.getElementById("message");

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
        u =>
            u.email === email &&
            u.password === password &&
            u.role === role
    );

    if (!user) {
        message.innerHTML =
            "<p style='color:red;'>Incorrect Gmail, password or role.</p>";
        return;
    }

    // Store logged-in user
    localStorage.setItem("loggedInUser", JSON.stringify(user));

    // Redirect according to role
    if (role === "Resident") {
        window.location.href = "resident.html";
    }
    else if (role === "Manager") {
        window.location.href = "manager.html";
    }
    else if (role === "Staff") {
        window.location.href = "staff.html";
    }
}


// ===============================
// SHOW / HIDE PASSWORD
// ===============================

function togglePassword() {

    const passwordInput = document.getElementById("password");
    const eye = document.getElementById("eye");

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        eye.textContent = "🙈";
    }
    else {
        passwordInput.type = "password";
        eye.textContent = "👁️";
    }
}
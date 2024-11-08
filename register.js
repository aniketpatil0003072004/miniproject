// Check if user is already registered
function isUserRegistered(username) {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    return users.some(user => user.username === username);
}

// Add user to the local storage
function registerUser(username, password) {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.push({ username: username, password: password });
    localStorage.setItem('users', JSON.stringify(users));
}

// Handle form submission
document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();

    let username = document.getElementById('newUsername').value;
    let password = document.getElementById('newPassword').value;
    let confirmPassword = document.getElementById('confirmPassword').value;

    // Validate the passwords
    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    // Check if user is already registered
    if (isUserRegistered(username)) {
        alert("Username already taken. Please choose another.");
        return;
    }

    // Register the new user
    registerUser(username, password);
    alert("Registration successful! You can now log in.");
    window.location.href = "login.html";  // Redirect to login page
});

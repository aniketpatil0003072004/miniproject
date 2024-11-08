document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Simulate login by storing the username in localStorage
    if (username && password) {
        localStorage.setItem('loggedInUser', username);
        window.location.href = 'todolist.html'; // Redirect to To-Do List page
    } else {
        alert('Please enter both username and password!');
    }
});

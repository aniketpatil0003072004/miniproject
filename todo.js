
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

const todoForm = document.getElementById('todoForm');
const taskInput = document.getElementById('taskInput');
const dateInput = document.getElementById('dateInput');
const taskList = document.getElementById('taskList');

// Render tasks in the To-Do List
function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${task.text} (Due: ${task.date})</span>
            <button onclick="deleteTask(${index})">Delete</button>
            <button onclick="editTask(${index})">Edit</button>
        `;
        taskList.appendChild(li);
    });
}

// Add task functionality
todoForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const taskText = taskInput.value;
    const taskDate = dateInput.value;

    if (taskText && taskDate) {
        const task = {
            text: taskText,
            date: taskDate
        };

        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));

        taskInput.value = ''; 
        dateInput.value = ''; 
        renderTasks(); 
    }
});

// Delete task functionality
function deleteTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

// Edit task functionality
function editTask(index) {
    const task = tasks[index];
    taskInput.value = task.text;
    dateInput.value = task.date;

    deleteTask(index);
}

// Show the appropriate section when buttons are clicked
document.getElementById('homeButton').addEventListener('click', function() {
    showSection('homeSection');
});

document.getElementById('todoListButton').addEventListener('click', function() {
    showSection('todoSection');
    renderTasks(); // Render tasks when switching back to To-Do List
});

document.getElementById('calendarButton').addEventListener('click', function() {
    showSection('calendarSection');
    // Initialize the calendar when clicked
    $('#calendar').fullCalendar('render');
});

// Logout button functionality
document.getElementById('logoutButton').addEventListener('click', function() {
    localStorage.removeItem('loggedInUser');
    window.location.href = 'login.html';
});

// Helper function to show the correct section
function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(function(section) {
        section.style.display = 'none';
    });

    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.style.display = 'block';
    }
}

// Initial display (show home section by default)
showSection('homeSection');
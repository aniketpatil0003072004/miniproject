// Assuming you already have tasks from localStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Set username from localStorage
let loggedInUser = localStorage.getItem('loggedInUser');
if (loggedInUser) {
    document.getElementById('username').textContent = loggedInUser;
} else {
    window.location.href = 'login.html';
}

// Initialize FullCalendar
let calendarEl = document.getElementById('calendar');
let calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    events: tasks.map(task => ({
        title: task.text,
        start: task.date
    }))
});
calendar.render();

// Render tasks in the to-do list
function renderTasks() {
    const taskList = document.getElementById('taskList');
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

    // Clear and reload calendar events
    calendar.removeAllEvents();
    tasks.forEach(task => {
        calendar.addEvent({
            title: task.text,
            start: task.date
        });
    });
}

// Add new task
document.getElementById('todoForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const taskText = document.getElementById('taskInput').value;
    const taskDate = document.getElementById('dateInput').value;

    if (taskText && taskDate) {
        const task = { text: taskText, date: taskDate };
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        document.getElementById('taskInput').value = '';
        document.getElementById('dateInput').value = '';
        renderTasks();
    }
});

// Delete a task
function deleteTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

// Edit a task
function editTask(index) {
    const task = tasks[index];
    document.getElementById('taskInput').value = task.text;
    document.getElementById('dateInput').value = task.date;
    deleteTask(index);
}

// Handle section switching
document.getElementById('homeBtn').addEventListener('click', function() {
    showSection('homeSection');
});

document.getElementById('todoListBtn').addEventListener('click', function() {
    showSection('todoSection');
});

document.getElementById('calendarBtn').addEventListener('click', function() {
    showSection('calendarSection');
});

// Helper function to show a section and hide others
function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.display = 'none';
    });
    
    document.getElementById(sectionId).style.display = 'block';
}

// Initial render
renderTasks();
showSection('homeSection');
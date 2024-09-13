// script.js
const taskInput = document.getElementById('taskInput');
const tasksList = document.getElementById('tasks');

// Fetch and display tasks
function fetchTasks() {
    fetch('/tasks')
        .then(response => response.json())
        .then(tasks => {
            tasksList.innerHTML = '';
            tasks.forEach(task => {
                tasksList.innerHTML += `
                    <li class="collection-item task-item">
                        <span>${task.name}</span>
                        <i class="material-icons red-text" onclick="deleteTask('${task._id}')">delete</i>
                    </li>
                `;
            });
        });
}

// Add a new task
function addTask() {
    const task = taskInput.value;
    if (task) {
        fetch('/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ task })
        })
        .then(response => response.json())
        .then(() => {
            taskInput.value = '';
            fetchTasks();
        });
    }
}

// Delete a task
function deleteTask(taskId) {
    fetch(`/tasks/${taskId}`, { method: 'DELETE' })
        .then(response => response.json())
        .then(() => {
            fetchTasks();
        });
}

// Initial fetch to load tasks
fetchTasks();


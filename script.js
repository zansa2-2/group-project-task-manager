let tasks = [];

loadTasks();

function addTask() {

    const taskName =
        document.getElementById("taskName").value;

    const assignedTo =
        document.getElementById("assignedTo").value;

    const dueDate =
        document.getElementById("dueDate").value;

    if (
        taskName === "" ||
        assignedTo === "" ||
        dueDate === ""
    ) {
        alert("Please fill in all fields.");
        return;
    }

    const task = {
        id: Date.now(),
        taskName: taskName,
        assignedTo: assignedTo,
        dueDate: dueDate,
        completed: false
    };

    tasks.push(task);

    saveTasks();

    displayTasks();

    clearInputs();
}

function displayTasks() {

    const taskList =
        document.getElementById("taskList");

    taskList.innerHTML = "";

    for (let i = 0; i < tasks.length; i++) {

        const task = tasks[i];

        const taskDiv =
            document.createElement("div");

        taskDiv.classList.add("task");

        if (task.completed) {
            taskDiv.classList.add("completed");
        }

        taskDiv.innerHTML = `
            <h3>${task.taskName}</h3>

            <p><strong>Assigned To:</strong>
            ${task.assignedTo}</p>

            <p><strong>Due Date:</strong>
            ${task.dueDate}</p>

            <p><strong>Status:</strong>
            ${task.completed ? "Completed" : "Pending"}</p>

            <div class="task-buttons">

                <button onclick="toggleComplete(${task.id})">
                    Complete
                </button>

                <button onclick="deleteTask(${task.id})">
                    Delete
                </button>

            </div>
        `;

        taskList.appendChild(taskDiv);
    }

    updateProgress();
}

function toggleComplete(id) {

    for (let i = 0; i < tasks.length; i++) {

        if (tasks[i].id === id) {

            tasks[i].completed =
                !tasks[i].completed;
        }
    }

    saveTasks();

    displayTasks();
}

function deleteTask(id) {

    tasks = tasks.filter(
        task => task.id !== id
    );

    saveTasks();

    displayTasks();
}

function updateProgress() {

    let completedCount = 0;

    for (let i = 0; i < tasks.length; i++) {

        if (tasks[i].completed) {
            completedCount++;
        }
    }

    let percentage = 0;

    if (tasks.length > 0) {
        percentage =
            (completedCount / tasks.length) * 100;
    }

    document.getElementById(
        "progressBar"
    ).style.width = percentage + "%";

    document.getElementById(
        "progressText"
    ).textContent =
        `${completedCount} / ${tasks.length} Tasks Completed`;
}

function clearInputs() {

    document.getElementById(
        "taskName"
    ).value = "";

    document.getElementById(
        "assignedTo"
    ).value = "";

    document.getElementById(
        "dueDate"
    ).value = "";
}

function saveTasks() {

    localStorage.setItem(
        "projectTasks",
        JSON.stringify(tasks)
    );
}

function loadTasks() {

    const savedTasks =
        localStorage.getItem("projectTasks");

    if (savedTasks) {

        tasks =
            JSON.parse(savedTasks);

        displayTasks();
    }
}

function clearAllTasks() {

    if (
        confirm(
            "Are you sure you want to delete everything?"
        )
    ) {

        tasks = [];

        saveTasks();

        displayTasks();
    }
}
function displayMyTasks() {

    const currentUser =
        document.getElementById(
            "currentUser"
        ).value.trim();

    const myTasksDiv =
        document.getElementById(
            "myTasks"
        );
const notificationBox =
    document.getElementById(
        "notificationBox"
    );
    myTasksDiv.innerHTML = "";

    if (currentUser === "") {

        myTasksDiv.innerHTML =
            "<p>Please enter your name.</p>";

        return;
    }

    let myTasksFound = 0;
    let unfinishedCount = 0;

    for (let i = 0; i < tasks.length; i++) {

        if (
            tasks[i].assignedTo
                .toLowerCase() ===
            currentUser.toLowerCase()
        ) {
            if (!tasks[i].completed) {
    unfinishedCount++;
}

            myTasksFound++;

            myTasksDiv.innerHTML += `
                <div class="my-task">
                    <strong>
                        ${tasks[i].taskName}
                    </strong><br>

                    Due:
                    ${tasks[i].dueDate}<br>

                    Status:
                    ${
                        tasks[i].completed
                        ? "✅ Completed"
                        : "⚠ Pending"
                    }
                </div>
            `;
        }
    }
if (unfinishedCount > 0) {

    notificationBox.innerHTML =
        `⚠ You have ${unfinishedCount}
         unfinished task(s)`;

}
else if (myTasksFound > 0) {

    notificationBox.innerHTML =
        "🎉 All of your tasks are complete!";
}
    if (myTasksFound === 0) {
        notificationBox.innerHTML =
    "No tasks assigned.";

        myTasksDiv.innerHTML =
            "<p>No tasks assigned to you.</p>";
    }
}

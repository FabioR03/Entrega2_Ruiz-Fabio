// VARIABLES INICIALES
const formList = document.getElementById("formTask")
const inputTask = document.getElementById("inputTask")
const taskContainer = document.querySelector(".taskContainer")
let tasks = JSON.parse(localStorage.getItem("tasks")) || []

// FUNCIONES
const addTaskToHtml = ({ value, done, id }) => {
    
        taskContainer.innerHTML += `
            <li id=${id}>
                <h3>${value}</h3>
                <div class="role-group">
                    <button id= "editTask">🖊</button>
                    <button id="successTask" class="success">${
                        done ? "✅" : "❌"
                    }</button>
                    <button id="deleteTask" class="Red">Eliminar tarea</button>
                </div>
                <div class="groupEditTask hidden">
                    <input class="inputEdit" type="text" name="inputEdit" placeholder="Edite su tarea">
                    <button id="overwriteTask">✅</button>
                </div>
            </li>`
    } 


const addTaskToLocalStorage = () =>
    localStorage.setItem("tasks", JSON.stringify(tasks))

const getTasksToLocalStorage = () => JSON.parse(localStorage.getItem("tasks"))

const paintAllTasksToLocalStorage = (tasks) => {
    taskContainer.innerHTML = ""
    tasks.forEach((task) => addTaskToHtml(task))
}

const showInputEditTask = (e) => {
    const taskId = e.target.parentElement.parentElement.id
    const liTask = document.getElementById(taskId)
    const groupEditTask = liTask.querySelector(".groupEditTask ")
    groupEditTask.classList.toggle("hidden")
}

const overwriteTask = (e) => {
    const inputEdit = e.target.previousElementSibling

    if (inputEdit.value === ""){
        return console.log("No puedes enviar una tarea vacía")
    }

    const tasksToLocalStorage = getTasksToLocalStorage()
    const taskId = e.target.parentElement.parentElement.id
    const liTask = document.getElementById(taskId)
    const titleTask = liTask.querySelector("h3")

    tasksToLocalStorage.forEach((task) => {
        if (task.id === taskId) task.value = inputEdit.value
    })

    titleTask.textContent = inputEdit.value
    tasks = tasksToLocalStorage
    addTaskToLocalStorage()
    inputEdit.value = ""
}

const deleteTask = (e) => {
    const taskId = e.target.parentElement.parentElement.id
    tasks = tasks.filter((task) => task.id != taskId)
    
    paintAllTaskToHtml(tasks)
    addTaskToLocalStorage()
}

const paintAllTaskToHtml = (tasks) => {
    taskContainer.innerHTML = ""
    tasks.forEach((task) => addTaskToHtml(task))
}

const succesTask = (e) => {
    const tasksToLocalStorage = getTasksToLocalStorage()
    const taskId = e.target.parentElement.parentElement.id

    tasksToLocalStorage.forEach((task) => {
        if (task.id === taskId) task.done = !task.done
    })

    tasks = tasksToLocalStorage
    paintAllTaskToHtml(tasks)
    addTaskToLocalStorage()
}

// EVENTOS
formList.addEventListener("submit", (e) => {
    e.preventDefault()
    if (inputTask.value === "") {
        console.log(undefined)
        
    }

    if (inputTask.value) {
        const createdTask = {
            value: inputTask.value,
            done: false,
            id: crypto.randomUUID(),
        }
        tasks = [...tasks, createdTask]

        addTaskToHtml(createdTask)
        addTaskToLocalStorage()

        inputTask.value = ""
    }
})

document.addEventListener("click", (e) => {
    let target = e.target

    if (target.id === "editTask") {
        showInputEditTask(e)
    }

    if (target.id === "overwriteTask") {
        overwriteTask(e)
    }

    if (target.id === "deleteTask") {
        deleteTask(e)
    }

    if (target.id === "successTask") {
        succesTask(e)
    }
})

document.addEventListener("DOMContentLoaded", () => {
    paintAllTasksToLocalStorage(tasks)
})

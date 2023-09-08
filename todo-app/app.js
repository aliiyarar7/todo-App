/* Variables */
const todoContainer = document.querySelector(".todo-container");
const addTodoInput = document.querySelector("#add-todo-input");
const addTodoButton = document.querySelector("#add-todo");
const completedButton = document.querySelector("#completed");
const allButton = document.querySelector("#all");
const inTodosButton = document.querySelector("#in-todos");

document.addEventListener("DOMContentLoaded", () => {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos.forEach((todo) => {
    createTodoElement(todo);
  });
});

/* Event Listeners */
addTodoButton.addEventListener("click", addTodo);
todoContainer.addEventListener("click", handleTodoClick);
completedButton.addEventListener("click", showCompleted);
allButton.addEventListener("click", showAll);
inTodosButton.addEventListener("click", showInTodos);

/* Functions */

function createTodoElement(todoText) {
  let newItem = document.createElement("div");
  newItem.classList.add("todo");
  let newInput = document.createElement("input");
  newInput.setAttribute("type", "text");
  newInput.setAttribute("readonly", "");
  newInput.value = todoText;
  newItem.innerHTML = `
    <i class="fa-solid fa-pen pen"></i>
    <i class="fa-solid fa-trash trash"></i>
    <i class="fa-solid fa-check check"></i>
  `;
  newItem.appendChild(newInput);
  todoContainer.appendChild(newItem);
}

function addTodo() {
  if (addTodoInput.value.trim() !== "") {
    createTodoElement(addTodoInput.value);
    saveTodoToLocalstorage(addTodoInput.value);
    addTodoInput.value = "";
  } else {
    alert("Lütfen Bir Görev Ekleyiniz...");
  }
}

function saveTodoToLocalstorage(todoText) {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos.push(todoText);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function deleteTodo(todoElement) {
  const todoText = todoElement.querySelector("input").value;
  removeTodoFromLocalstorage(todoText);
  todoElement.remove();
}

function removeTodoFromLocalstorage(todoText) {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  const updatedTodos = todos.filter((todo) => todo !== todoText);
  localStorage.setItem("todos", JSON.stringify(updatedTodos));
}

function handleTodoClick(e) {
  if (e.target.classList.contains("trash")) {
    deleteTodo(e.target.parentElement);
  } else if (e.target.classList.contains("check")) {
    e.target.parentElement.classList.toggle("completed");
  } else if (e.target.classList.contains("pen")) {
    let todoItem = e.target.parentElement;
    let input = todoItem.querySelector("input");
    input.readOnly = false;
    input.addEventListener("blur", saveChanges);
  }
}

function saveChanges() {
  let todoItem = this.parentElement;
  let value = this.value;
  todoItem.querySelector("input").value = value;
  this.readOnly = true;
  const originalText = todoItem.querySelector("input").value;
  updateTodoInLocalstorage(originalText, value);
}

function updateTodoInLocalstorage(originalText, updatedText) {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  const updatedTodos = todos.map((todo) => {
    if (todo === originalText) {
      return updatedText;
    }
    return todo;
  });
  localStorage.setItem("todos", JSON.stringify(updatedTodos));
}

function showCompleted() {
  const todoItems = document.querySelectorAll(".todo");
  todoItems.forEach((item) => {
    if (item.classList.contains("completed")) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}

function showAll() {
  const todoItems = document.querySelectorAll(".todo");
  todoItems.forEach((item) => {
    item.style.display = "flex";
  });
}

function showInTodos() {
  const todoItems = document.querySelectorAll(".todo");
  todoItems.forEach((item) => {
    if (!item.classList.contains("completed")) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}

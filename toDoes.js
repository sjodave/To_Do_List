"use Strict";

let todosArr = [];
let filteredArr = [];
let deletedArr = [];
document.getElementById("todo").addEventListener("keydown", function (e) {
  if (e.key == "Enter") {
    addTask();
  }
});
function addTask() {
  const todo = document.getElementById("todo");
  const todosObj = {
    title: todo.value,
    completed: false,
  };
  if (todo.value) {
    todosArr.push(todosObj);
    allTask();
    todo.value = "";
    todo.focus();
  } else {
    document.getElementById("addTodo").style.display = "inline";
    setTimeout(() => {
      document.getElementById("addTodo").style.display = "none";
    }, 1000);
  }
}

function updateTodoList(filteredArr) {
  const listElements = filteredArr || todosArr;
  const list = document.getElementById("list");

  list.innerHTML = "";

  for (let todo of listElements) {
    const listElement = document.createElement("li");

    listElement.innerHTML = todo.title;
    if (todo.completed) {
      listElement.style.backgroundColor = "rgb(175, 165, 165)";
    }
    //delete button
    const deleteButton = document.createElement("span");

    deleteButton.innerHTML = "❌";
    deleteButton.addEventListener("click", () => {
      deleteElement(todo);
    });

    //checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.addEventListener("click", () => {
      updateStatus(todo);
    });

    listElement.prepend(checkbox);
    listElement.appendChild(deleteButton);
    list.appendChild(listElement);
  }
}

function deleteElement(todo) {
  const index = todosArr.indexOf(todo);
  deletedArr.push(todo);
  todosArr.splice(index, 1);
  allTask();
}

function updateStatus(todo) {
  todo.completed = !todo.completed;
  allTask();
}

function completed() {
  filteredArr = todosArr.filter((todo) => {
    return todo.completed;
  });
  updateTodoList(filteredArr);
}

function pending() {
  filteredArr = todosArr.filter((todo) => {
    return !todo.completed;
  });
  updateTodoList(filteredArr);
}

function allTask() {
  filteredArr = todosArr
    .filter((todo) => {
      return !todo.completed;
    })
    .concat(
      todosArr.filter((todo) => {
        return todo.completed;
      })
    );
  updateTodoList(filteredArr);
}

function deleted() {
  const list = document.getElementById("list");
  list.innerHTML = ""; //to clear previous list
  for (let todo of deletedArr) {
    const listElement = document.createElement("li");
    listElement.innerHTML = todo.title;

    listElement.addEventListener("click", () => {
      todosArr.push(todo);
      deletedArr.splice(deletedArr.indexOf(todo), 1);
      allTask();
    });
    list.appendChild(listElement);
  }
}
function clearAl() {
  console.log("clear");
  todosArr = [];
  filteredArr = [];
  deletedArr = [];
  updateTodoList();
}

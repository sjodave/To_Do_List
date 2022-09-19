"use Strict";
let todosArr = [];
let filteredArr = [];
let deletedArr = [];

const updateLocalStorage = () => {
  const json = JSON.stringify(todosArr);
  localStorage.setItem("todo", json);
};

const load = () => {
  const json = localStorage.getItem("todo");
  const loadedTodos = JSON.parse(json);
  if (loadedTodos) {
    todosArr = loadedTodos;
    allTask();
  }
};

document.getElementById("todo").addEventListener("keydown", function (e) {
  if (e.key == "Enter") {
    addTask();
  }
});

function addTask() {
  const todo = document.getElementById("todo");
  //first letter capitalization
  const todoValue = todo.value.replace(
    todo.value.charAt(0),
    todo.value.charAt(0).toUpperCase()
  );

  const todosObj = {
    title: todoValue,
    completed: false,
  };
  if (todo.value) {
    todosArr.push(todosObj);
    allTask();
    todo.value = "";
    todo.focus();
    updateLocalStorage();
  } else {
    document.getElementById("addTodo").style.display = "inline";
    setTimeout(() => {
      document.getElementById("addTodo").style.display = "none";
    }, 1000);
  }
}

//display list
function updateTodoList(filteredArr) {
  const listElements = filteredArr || todosArr;
  const list = document.getElementById("list");
  list.innerHTML = ""; //clearing previous list

  for (let todo of listElements) {
    const listElement = document.createElement("li");

    listElement.innerHTML = todo.title;
    if (todo.completed) {
      listElement.style.backgroundColor = "rgb(175, 165, 165)";
    }
    //Edit button
    const editButton = document.createElement("button");
    editButton.innerHTML = "Edit";
    editButton.addEventListener("click", () => {
      editTodo(todo);
    });

    // delete button
    const deleteButton = document.createElement("button");
    const trashIcon = document.createElement("i");
    trashIcon.classList = "fa fa-trash";
    trashIcon.style.color = "red";
    deleteButton.appendChild(trashIcon);
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
    listElement.appendChild(editButton);
    listElement.appendChild(deleteButton);
    list.appendChild(listElement);
  }
}

//delete todo
function deleteElement(todo) {
  const index = todosArr.indexOf(todo);
  deletedArr.push(todo);
  todosArr.splice(index, 1);
  allTask();
  updateLocalStorage();
}

//updating compleat status
function updateStatus(todo) {
  todo.completed = !todo.completed;
  allTask();
  updateLocalStorage();
}

//display completed list
function completed() {
  filteredArr = todosArr.filter((todo) => {
    return todo.completed;
  });
  updateTodoList(filteredArr);
}

//display pending list
function pending() {
  filteredArr = todosArr.filter((todo) => {
    return !todo.completed;
  });
  updateTodoList(filteredArr);
}

//display all task --first uncompleted tasks then completed tasks
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

//display Deleted todos
function deleted() {
  const list = document.getElementById("list");
  list.innerHTML = ""; //to clear previous list
  for (let todo of deletedArr) {
    const listElement = document.createElement("li");
    listElement.innerHTML = todo.title;
    listElement.style.backgroundColor = "red";
    listElement.style.color = "white";
    // const recycleButton = document.createElement("button");
    const recycleIcon = document.createElement("i");
    recycleIcon.classList = "fa fa-recycle";
    recycleIcon.style.color = "white";
    // recycleButton.appendChild(recycleIcon);
    recycleIcon.addEventListener("click", () => {
      todosArr.push(todo);
      deletedArr.splice(deletedArr.indexOf(todo), 1);
      allTask();
    });
    listElement.prepend(recycleIcon);
    list.appendChild(listElement);
  }
}

//clearing all list
function clearAl() {
  todosArr = [];
  filteredArr = [];
  deletedArr = [];
  updateTodoList();
  updateLocalStorage();
}

//edit todo
function editTodo(todo) {
  let correctTodo = prompt("Please Edit Todo", `${todo.title}`);
  const index = todosArr.indexOf(todo);
  todosArr = todosArr.filter((td) => {
    if (todosArr.indexOf(td) === index) {
      td.title = correctTodo;
      return td;
    } else return td;
  });
  allTask();
  updateLocalStorage();
}

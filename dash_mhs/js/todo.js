// Mendapatkan elemen-elemen
const addTodoButton = document.getElementById("add-todo");
const todoList = document.getElementById("todo-list");
const todoPopup = document.getElementById("todo-popup");
const saveTodoButton = document.getElementById("save-todo");
const closePopupButton = document.getElementById("close-popup");
const newTodoText = document.getElementById("new-todo-text");

// Data todo
let todos = JSON.parse(localStorage.getItem("todos")) || [];

// Render todo list
function renderTodos() {
  todoList.innerHTML = ""; // Clear todo list
  todos.forEach((todo, index) => {
    const todoItem = document.createElement("li");
    todoItem.classList.add(todo.completed ? "completed" : "not-completed");
    todoItem.innerHTML = `
      <span class="drag-handle"></span>
      <input type="checkbox" class="todo-checkbox" ${
        todo.completed ? "checked" : ""
      } data-index="${index}" />
      <p class="todo-text">${todo.text}</p>
      <i class="bx bxs-trash delete-icon" data-index="${index}"></i>
    `;
    todoList.appendChild(todoItem);
  });

  attachEventListeners(); // Tambahkan event listener setelah render
}

// Tambah todo baru
addTodoButton.addEventListener("click", () => {
  todoPopup.style.display = "block";
});

saveTodoButton.addEventListener("click", saveTodo);

newTodoText.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    saveTodo();
  }
});

closePopupButton.addEventListener("click", () => {
  todoPopup.style.display = "none";
});

// Fungsi untuk menyimpan todo
function saveTodo() {
  const text = newTodoText.value.trim();
  if (text) {
    todos.push({ text, completed: false });
    localStorage.setItem("todos", JSON.stringify(todos));
    renderTodos();
    newTodoText.value = "";
    todoPopup.style.display = "none";
  }
}

// Fungsi hapus todo
function deleteTodo(index) {
  todos.splice(index, 1);
  localStorage.setItem("todos", JSON.stringify(todos));
  renderTodos();
}

// Fungsi toggle selesai
function toggleComplete(index) {
  todos[index].completed = !todos[index].completed;
  localStorage.setItem("todos", JSON.stringify(todos));
  renderTodos();
}

// Event listener dinamis
function attachEventListeners() {
  document
    .querySelectorAll(".delete-icon")
    .forEach((icon) =>
      icon.addEventListener("click", (e) => deleteTodo(e.target.dataset.index))
    );
  document
    .querySelectorAll(".todo-checkbox")
    .forEach((checkbox) =>
      checkbox.addEventListener("change", (e) =>
        toggleComplete(e.target.dataset.index)
      )
    );
}

// Aktifkan drag and drop
function enableDragAndDrop() {
  let draggedItem = null;
  todoList.addEventListener("dragstart", (e) => {
    draggedItem = e.target;
    setTimeout(() => (e.target.style.display = "none"), 0);
  });
  todoList.addEventListener("dragend", (e) => {
    setTimeout(() => (draggedItem.style.display = "flex"), 0);
    draggedItem = null;
  });
  todoList.addEventListener("dragover", (e) => e.preventDefault());
  todoList.addEventListener("drop", (e) => {
    e.preventDefault();
    if (draggedItem && e.target.tagName === "LI") {
      todoList.insertBefore(draggedItem, e.target.nextSibling);
    }
  });
}

// Inisialisasi
document.addEventListener("DOMContentLoaded", () => {
  renderTodos();
  enableDragAndDrop();
});

// todo drag and drop
let draggedItem = null;
let placeholder = document.createElement("li");
placeholder.classList.add("placeholder");

function enableDragAndDrop() {
  const items = document.querySelectorAll(".todo-list li");
  items.forEach((item) => {
    item.addEventListener("dragstart", handleDragStart);
    item.addEventListener("dragend", handleDragEnd);
  });

  todoList.addEventListener("dragover", handleDragOver);
  todoList.addEventListener("drop", handleDrop);
}

function handleDragStart(e) {
  draggedItem = e.target;
  e.target.classList.add("dragging");

  // Prevent drag on checkbox and delete icon
  const isHandle =
    e.target.classList.contains("drag-handle") || e.target === draggedItem;

  if (!isHandle) {
    e.preventDefault();
    return;
  }

  setTimeout(() => {
    draggedItem.style.display = "none";
    todoList.appendChild(placeholder);
  }, 0);
}

function handleDragEnd(e) {
  if (draggedItem) {
    draggedItem.classList.remove("dragging");
    draggedItem.style.display = "flex";
    placeholder.remove();
    saveOrder();
    draggedItem = null;
  }
}

function handleDragOver(e) {
  e.preventDefault();
  const afterElement = getDragAfterElement(todoList, e.clientY);
  if (afterElement == null) {
    todoList.appendChild(placeholder);
  } else {
    todoList.insertBefore(placeholder, afterElement);
  }
}

function handleDrop(e) {
  e.preventDefault();
  if (draggedItem) {
    todoList.insertBefore(draggedItem, placeholder);
    saveOrder();
  }
}

function getDragAfterElement(container, y) {
  const draggableElements = [
    ...container.querySelectorAll("li:not(.dragging):not(.placeholder)"),
  ];

  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}

function saveOrder() {
  const items = [...todoList.querySelectorAll("li:not(.placeholder)")];
  const todos = items.map((item) => {
    const text = item.querySelector(".todo-text").textContent;
    const completed = item.querySelector(".todo-checkbox").checked;
    return { text, completed };
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Inisialisasi drag and drop
document.addEventListener("DOMContentLoaded", () => {
  enableDragAndDrop();
});

// todo inline editing
// Fungsi untuk mengaktifkan inline editing
function enableInlineEditing() {
  todoList.addEventListener("click", (e) => {
    if (e.target.classList.contains("todo-text")) {
      const todoText = e.target;
      const originalText = todoText.textContent;

      const inputField = document.createElement("input");
      inputField.type = "text";
      inputField.value = originalText;
      inputField.classList.add("editing");

      todoText.replaceWith(inputField);
      inputField.focus();

      // Simpan perubahan saat tekan Enter atau klik di luar
      inputField.addEventListener("blur", () => {
        const updatedText = inputField.value.trim() || originalText;
        todoText.textContent = updatedText;
        inputField.replaceWith(todoText);
        saveOrder();
      });

      inputField.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          inputField.blur();
        }
      });
    }
  });
}

// inisialisasi
document.addEventListener("DOMContentLoaded", () => {
  renderTodos();
  enableDragAndDrop();
  enableInlineEditing();
});

// todo teks checkbox
document.addEventListener("DOMContentLoaded", () => {
  const todoList = document.getElementById("todo-list");

  // Fungsi untuk toggle garis pada teks
  const toggleLineThrough = (checkbox) => {
    const listItem = checkbox.closest("li");
    const text = listItem.querySelector(".todo-text");

    if (checkbox.checked) {
      text.classList.add("line-through");
      listItem.classList.remove("not-completed");
      listItem.classList.add("completed");
    } else {
      text.classList.remove("line-through");
      listItem.classList.remove("completed");
      listItem.classList.add("not-completed");
    }
  };

  // Menambahkan event listener untuk checkbox yang sudah ada dan yang baru
  todoList.addEventListener("change", (e) => {
    if (e.target.classList.contains("todo-checkbox")) {
      toggleLineThrough(e.target);
    }
  });

  // Event listener untuk semua checkbox, termasuk yang ditambahkan secara dinamis
  todoList.addEventListener("change", (event) => {
    if (event.target && event.target.classList.contains("todo-checkbox")) {
      toggleLineThrough(event.target);
    }
  });

  // Fungsi untuk menambah todo baru
  const addTodo = (text) => {
    const newTodo = document.createElement("li");
    newTodo.classList.add("not-completed");
    newTodo.innerHTML = `
      <span class="drag-handle"></span>
      <input type="checkbox" class="todo-checkbox" />
      <p class="todo-text">${text}</p>
      <i class="bx bxs-trash delete-icon"></i>
    `;
    todoList.appendChild(newTodo);
  };

  // Event listener tombol "Simpan" pada popup
  document.getElementById("save-todo").addEventListener("click", () => {
    const newTodoText = document.getElementById("new-todo-text").value;
    if (newTodoText.trim() !== "") {
      addTodo(newTodoText);
      document.getElementById("new-todo-text").value = ""; // Bersihkan input
      document.getElementById("todo-popup").style.display = "none"; // Tutup popup
    }
  });

  // Event listener tombol "Tutup" pada popup
  document.getElementById("close-popup").addEventListener("click", () => {
    document.getElementById("todo-popup").style.display = "none";
  });

  // Event listener tombol tambah todo
  document.getElementById("add-todo").addEventListener("click", () => {
    document.getElementById("todo-popup").style.display = "block";
  });
});

let todos = JSON.parse(localStorage.getItem("todos")) || [];
let editingId = null;

function renderTodos() {
  const inProgressList = document.getElementById("inProgressList");
  const completedList = document.getElementById("completedList");

  inProgressList.innerHTML = "";
  completedList.innerHTML = "";

  const inProgressTodos = todos.filter((todo) => !todo.completed);
  const completedTodos = todos.filter((todo) => todo.completed);

  document.getElementById("inProgressCount").textContent =
    inProgressTodos.length;
  document.getElementById("completedCount").textContent = completedTodos.length;

  // Update progress bar
  const totalTodos = todos.length;
  const progressPercentage = totalTodos
    ? (completedTodos.length / totalTodos) * 100
    : 0;
  document.getElementById(
    "inProgressBar"
  ).style.width = `${progressPercentage}%`;

  if (inProgressTodos.length === 0) {
    inProgressList.innerHTML = `
                    <div class="empty-state">
                        <i class="fas fa-tasks empty-icon"></i>
                        <p class="empty-text">No tasks in progress</p>
                    </div>`;
  }

  if (completedTodos.length === 0) {
    completedList.innerHTML = `
                    <div class="empty-state">
                        <i class="fas fa-check-circle empty-icon"></i>
                        <p class="empty-text">No completed tasks</p>
                    </div>`;
  }

  inProgressTodos.forEach((todo) => renderTodoCard(todo, inProgressList));
  completedTodos.forEach((todo) => renderTodoCard(todo, completedList));

  localStorage.setItem("todos", JSON.stringify(todos));
}

function renderTodoCard(todo, container) {
  const li = document.createElement("li");
  li.className = "todo-card";
  li.draggable = true;

  const priorityClass = todo.priority
    ? `priority-${todo.priority}`
    : "priority-medium";
  const dateCreated = new Date(parseInt(todo.id)).toLocaleDateString();

  li.innerHTML = `
                <div class="priority-indicator ${priorityClass}"></div>
                <div class="todo-content">
                    <div class="todo-text">${todo.text}</div>
                    <div class="card-actions">
                        ${
                          !todo.completed
                            ? `
                            <button class="action-btn edit-btn" onclick="editTodo('${todo.id}')" title="Edit">
                                <i class="fas fa-edit"></i>
                            </button>
                        `
                            : ""
                        }
                        <button class="action-btn move-btn" onclick="toggleTodo('${
                          todo.id
                        }')" title="${
    todo.completed ? "Mark as incomplete" : "Mark as complete"
  }">
                            <i class="fas ${
                              todo.completed ? "fa-undo" : "fa-check"
                            }"></i>
                        </button>
                        <button class="action-btn delete-btn" onclick="deleteTodo('${
                          todo.id
                        }')" title="Delete">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                <div class="date-badge">
                    <i class="far fa-calendar-alt"></i> ${dateCreated}
                </div>
            `;

  // Add drag and drop events
  li.addEventListener("dragstart", () => {
    li.classList.add("dragging");
    li.dataset.todoId = todo.id;
  });

  li.addEventListener("dragend", () => {
    li.classList.remove("dragging");
  });

  container.appendChild(li);
}

function addTodo() {
  const input = document.getElementById("todoInput");
  const text = input.value.trim();

  if (text) {
    if (editingId) {
      const index = todos.findIndex((todo) => todo.id === editingId);
      if (index !== -1) {
        todos[index].text = text;
        editingId = null;
      }
    } else {
      const priority = getPriority(text);
      todos.push({
        id: Date.now().toString(),
        text: text,
        completed: false,
        priority: priority,
      });
    }

    input.value = "";
    renderTodos();
  }
}

function getPriority(text) {
  const lowPriorityKeywords = ["later", "maybe", "sometime"];
  const highPriorityKeywords = ["urgent", "asap", "important"];

  text = text.toLowerCase();

  if (highPriorityKeywords.some((keyword) => text.includes(keyword))) {
    return "high";
  } else if (lowPriorityKeywords.some((keyword) => text.includes(keyword))) {
    return "low";
  }
  return "medium";
}

function toggleTodo(id) {
  const todo = todos.find((todo) => todo.id === id);
  if (todo) {
    todo.completed = !todo.completed;
    renderTodos();
  }
}

function editTodo(id) {
  const todo = todos.find((todo) => todo.id === id);
  if (todo) {
    const input = document.getElementById("todoInput");
    input.value = todo.text;
    input.focus();
    editingId = id;
  }
}

function deleteTodo(id) {
  todos = todos.filter((todo) => todo.id !== id);
  renderTodos();
}

// Drag and drop functionality
document.querySelectorAll(".todo-list").forEach((list) => {
  list.addEventListener("dragover", (e) => {
    e.preventDefault();
    const draggingCard = document.querySelector(".dragging");
    const todoId = draggingCard?.dataset.todoId;

    if (todoId) {
      const todo = todos.find((t) => t.id === todoId);
      if (todo) {
        const isCompletedList = list.id === "completedList";
        todo.completed = isCompletedList;
        renderTodos();
      }
    }
  });
});

document.getElementById("todoInput").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTodo();
  }
});

// Focus input on page load
window.addEventListener("load", () => {
  document.getElementById("todoInput").focus();
});

// Search/Filter functionality
document.getElementById("todoInput").addEventListener("input", function (e) {
  const searchTerm = e.target.value.toLowerCase();
  if (!editingId) {
    document.querySelectorAll(".todo-card").forEach((card) => {
      const text = card.querySelector(".todo-text").textContent.toLowerCase();
      card.style.display = text.includes(searchTerm) ? "block" : "none";
    });
  }
});

// Auto-save backup every minute
setInterval(() => {
  if (todos.length > 0) {
    const backup = {
      todos: todos,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem("todos_backup", JSON.stringify(backup));
  }
}, 60000);

// Keyboard shortcuts
document.addEventListener("keydown", function (e) {
  // Ctrl/Cmd + S to save
  if ((e.ctrlKey || e.metaKey) && e.key === "s") {
    e.preventDefault();
    localStorage.setItem("todos", JSON.stringify(todos));
  }
  // Ctrl/Cmd + Z to undo last action
  if ((e.ctrlKey || e.metaKey) && e.key === "z") {
    e.preventDefault();
    const backup = localStorage.getItem("todos_backup");
    if (backup) {
      todos = JSON.parse(backup).todos;
      renderTodos();
    }
  }
});

function parseDate(text) {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (text.toLowerCase().includes("today")) {
    return today;
  } else if (text.toLowerCase().includes("tomorrow")) {
    return tomorrow;
  }
  return null;
}

function sortTodos() {
  const priorityOrder = { high: 0, medium: 1, low: 2 };
  todos.sort((a, b) => {
    if (a.completed !== b.completed) return a.completed ? 1 : -1;
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });
}

const debouncedRender = debounce(renderTodos, 100);

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function showToast(message, type = "info") {
  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}

const toastStyles = document.createElement("style");
toastStyles.textContent = `
          .toast {
              position: fixed;
              bottom: 20px;
              right: 20px;
              padding: 12px 24px;
              border-radius: 8px;
              color: white;
              font-size: 14px;
              z-index: 1000;
              animation: slideIn 0.3s ease, fadeOut 0.3s ease 2.7s;
          }
          .toast-info { background: #2196F3; }
          .toast-success { background: #4CAF50; }
          .toast-error { background: #f44336; }
          @keyframes fadeOut {
              to { opacity: 0; }
          }
      `;
document.head.appendChild(toastStyles);

function initApp() {
  const savedTodos = localStorage.getItem("todos");
  if (savedTodos) {
    todos = JSON.parse(savedTodos);
  }

  if (todos.length === 0) {
    todos.push({
      id: Date.now().toString(),
      text: "Welcome! Add your first task",
      completed: false,
      priority: "medium",
    });
  }

  renderTodos();

  showToast("Welcome to Task Manager!", "info");
}

initApp();

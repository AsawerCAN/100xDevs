const { Command } = require("commander");
const fs = require("fs");
const path = require("path");
const program = new Command();

// File to store todos
const TODOS_FILE = "todos.json";

// Helper function to read todos
function readTodos() {
  try {
    if (!fs.existsSync(TODOS_FILE)) {
      return [];
    }
    const data = fs.readFileSync(TODOS_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading todos:", error.message);
    return [];
  }
}

// Helper function to write todos
function writeTodos(todos) {
  try {
    fs.writeFileSync(TODOS_FILE, JSON.stringify(todos, null, 2));
  } catch (error) {
    console.error("Error writing todos:", error.message);
    process.exit(1);
  }
}

// Configure CLI
program
  .name("todo-cli")
  .description("CLI to manage your todos")
  .version("1.0.0");

// Add todo command
program
  .command("add")
  .description("Add a new todo")
  .argument("<title>", "title of the todo")
  .argument("<time>", "time for the todo (HH:mm)")
  .argument(
    "[date]",
    "date for the todo (YYYY-MM-DD)",
    new Date().toISOString().split("T")[0]
  )
  .action((title, time, date) => {
    if (!/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(time)) {
      console.error(
        "Invalid time format. Please use HH:mm format (e.g., 18:00)"
      );
      process.exit(1);
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      console.error("Invalid date format. Please use YYYY-MM-DD format");
      process.exit(1);
    }

    const todos = readTodos();

    // Check if todo already exists
    const exists = todos.some(
      (todo) => todo.title === title && todo.date === date
    );

    if (exists) {
      console.error(`A todo with title "${title}" already exists on ${date}`);
      process.exit(1);
    }

    todos.push({
      title,
      time,
      date,
      done: false,
    });

    writeTodos(todos);
    console.log(`Added todo: "${title}" for ${date} at ${time}`);
  });

// Remove todo command
program
  .command("remove")
  .description("Remove a todo")
  .argument("<title>", "title of the todo")
  .argument("<date>", "date of the todo (YYYY-MM-DD)")
  .action((title, date) => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      console.error("Invalid date format. Please use YYYY-MM-DD format");
      process.exit(1);
    }

    const todos = readTodos();
    const initialLength = todos.length;

    const filteredTodos = todos.filter(
      (todo) => !(todo.title === title && todo.date === date)
    );

    if (filteredTodos.length === initialLength) {
      console.error(`No todo found with title "${title}" on ${date}`);
      process.exit(1);
    }

    writeTodos(filteredTodos);
    console.log(`Removed todo: "${title}" from ${date}`);
  });

// Mark todo as done command
program
  .command("mark")
  .description("Mark a todo as done")
  .argument("<title>", "title of the todo")
  .argument("<date>", "date of the todo (YYYY-MM-DD)")
  .action((title, date) => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      console.error("Invalid date format. Please use YYYY-MM-DD format");
      process.exit(1);
    }

    const todos = readTodos();
    let found = false;

    const updatedTodos = todos.map((todo) => {
      if (todo.title === title && todo.date === date) {
        found = true;
        return { ...todo, done: true };
      }
      return todo;
    });

    if (!found) {
      console.error(`No todo found with title "${title}" on ${date}`);
      process.exit(1);
    }

    writeTodos(updatedTodos);
    console.log(`Marked todo as done: "${title}" from ${date}`);
  });

// List all todos command
program
  .command("list")
  .description("List all todos")
  .action(() => {
    const todos = readTodos();
    if (todos.length === 0) {
      console.log("No todos found");
      return;
    }

    console.log("\nYour todos:\n");
    todos.forEach((todo) => {
      const status = todo.done ? "✓" : " ";
      console.log(`[${status}] ${todo.title} (${todo.date} at ${todo.time})`);
    });
  });

program.parse();

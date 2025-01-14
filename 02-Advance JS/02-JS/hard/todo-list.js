class Todo {
  constructor() {
    this.todos = [];
  }

  add(todo) {
    this.todos.push(todo);
  }

  remove(indexOfTodo) {
    if (indexOfTodo < 0 || indexOfTodo >= this.todos.length) {
      throw new Error("Invalid index.");
    }
    this.todos.splice(indexOfTodo, 1);
  }

  update(index, updatedTodo) {
    if (index < 0 || index >= this.todos.length) {
      throw new Error("Invalid index.");
    }
    this.todos[index] = updatedTodo;
  }

  getAll() {
    return this.todos;
  }

  get(indexOfTodo) {
    if (indexOfTodo < 0 || indexOfTodo >= this.todos.length) {
      throw new Error("Invalid index.");
    }
    return this.todos[indexOfTodo];
  }

  clear() {
    this.todos = [];
  }
}

const todoList = new Todo();

todoList.add("Buy groceries");
todoList.add("Learn JavaScript");
todoList.add("Exercise");
console.log(todoList.getAll());

console.log(todoList.get(1));

todoList.update(1, "Learn React");
console.log(todoList.getAll());

todoList.remove(2);
console.log(todoList.getAll());

todoList.clear();
console.log(todoList.getAll());

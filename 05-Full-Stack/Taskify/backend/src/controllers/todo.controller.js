import TodoModel from "../model/todo.model.js";

export const createTodo = async (req, res) => {
  const { title, isCompleted } = req.body;
  try {
    if (!title) {
      return res.ststus(400).json({ message: "Title Missing" });
    }

    const newTodo = await TodoModel.create({
      title,
      isCompleted,
      userId: req.userId,
    });
    return res.status(201).json({ message: "Todo created" });
  } catch (error) {
    console.log("error in todo create controller", error);
    return res.status(400).json({ message: "Error Creating Todo" });
  }
};

export const updateTodo = async (req, res) => {
  const { title } = req.body;
  const { id } = req.params;
  const userId = await req.userId;

  try {
    if (!id) {
      return res.status(400).json({ message: "Todo ID is required" });
    }

    const existingTodo = await TodoModel.findOne({ _id: id, userId });
    if (!existingTodo) {
      return res
        .status(404)
        .json({ message: "Todo not found or access denied" });
    }

    const updatedTodo = await TodoModel.findByIdAndUpdate(
      id,
      { title },
      { new: true, runValidators: true }
    );

    return res
      .status(200)
      .json({ message: "Todo Updated successfully", todo: updateTodo });
  } catch (error) {
    console.log("error in todo update controller", error.message);
    return res.status(500).json({ message: "Error Updating Todo" });
  }
};

export const getTodos = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;

  try {
    if (id) {
      const todo = await TodoModel.findOne({ _id: id, userId });
      if (!todo) {
        return res
          .status(404)
          .json({ message: "Todo not found or unauthorized" });
      }
      return res.status(200).json(todo);
    } else {
      const todos = await TodoModel.find({ userId });
      return res.status(200).json(todos);
    }
  } catch (error) {
    console.log("error in get todo  controller", error.message);
    return res.status(500).json({ message: "Error Getting Todo" });
  }
};

export const deleteTodo = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;

  try {
    if (!id) {
      return res.status(400).json({ message: "Todo ID required" });
    }

    const todo = await TodoModel.findOneAndDelete({ _id: id, userId });
    if (!todo) {
      return res
        .status(404)
        .json({ message: "Todo not found or unauthorized" });
    }

    return res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    console.log("error in delete todo  controller", error.message);
    return res.status(500).json({ message: "Error Deleting Todo" });
  }
};

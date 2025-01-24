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
        .status(400)
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
    return res.status(400).json({ message: "Error Updating Todo" });
  }
};

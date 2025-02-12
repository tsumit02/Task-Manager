const TaskModel = require("../Models/TaskModels");

const createTask = async (req, res) => {
  // const data = req.body;
  // try {
  //   const model = new TaskModel(data);
  //   await model.save();
  //   res.status(201).json({ message: "Task is created", success: true });
  // } catch (err) {
  //   res.status(500).json({ message: "Failed to create task", success: false });
  // }

  const { taskName, isDone, userId } = req.body;
  console.log(req.body);
  if (!userId)
    return res
      .status(400)
      .json({ success: false, message: "User ID is required" });

  try {
    const newTask = new Task({ taskName, isDone, userId });
    await newTask.save();
    res.status(201).json({
      success: true,
      message: "Task created successfully",
      task: newTask,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const fetchAllTasks = async (req, res) => {
  try {
    const data = await TaskModel.find({});
    res.status(200).json({ message: "All Tasks", success: true, data });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to get all tasks", success: false });
  }
};

const updateTaskById = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const obj = { $set: { ...body } };
    await TaskModel.findByIdAndUpdate(id, obj);
    res.status(200).json({ message: "Task Updated", success: true });
  } catch (err) {
    res.status(500).json({ message: "Failed to updated task", success: false });
  }
};

const deleteTaskById = async (req, res) => {
  try {
    const id = req.params.id;
    await TaskModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Task is deleted", success: true });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete task", success: false });
  }
};

module.exports = {
  createTask,
  fetchAllTasks,
  updateTaskById,
  deleteTaskById,
};

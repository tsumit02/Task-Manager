const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema(
  {
    taskName: {
      type: String,
      required: true,
    },
    isDone: {
      type: Boolean,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
  },
  { timestamps: true }
);

const TaskModel = mongoose.model("todos", TaskSchema);
module.exports = TaskModel;

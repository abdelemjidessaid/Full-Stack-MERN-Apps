import mongoose, { Schema, Model } from "mongoose";
import { Task } from "../Types/Task";

const taskSchema: Schema<Task> = new Schema({
  userId: {
    type: String,
    required: true,
  },
  taskTitle: {
    type: String,
    required: true,
  },
  taskDescription: {
    type: String,
    required: true,
  },
  expirationDate: {
    type: String,
    required: true,
  },
  creationDate: {
    type: String,
    required: true,
  },
  finished: {
    type: Boolean,
    required: true,
  },
});

const TaskModel: Model<Task> = mongoose.model<Task>("Task", taskSchema);

export default TaskModel;

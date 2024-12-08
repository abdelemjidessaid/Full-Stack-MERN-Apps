import { Request, Response } from "express";
import TaskModel from "../Models/Task";
import { validationResult } from "express-validator";
import { Task } from "../Types/Task";

/**
 * userTasks - @async function that retrive all tasks from database and return it as
 *             response to the user.
 *
 * @param req Express Request - request for fetching all user tasks by his ID.
 * @param res Express Response - contains all user tasks if eixsts.
 * @returns an Express Response or void.
 */
const userTasks = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const userId = req.userId;

    const tasks = await TaskModel.find({ userId: userId });
    res.json(tasks);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong during tasks fetching" });
  }
};

/**
 * createTask - @async function that creates new task for the specific user.
 *
 * @param req Express Request - request contains information to create new task.
 * @param res Express Response - response contains status of the task creation.
 * @returns Express Response or void.
 */
const createTask = async (req: Request, res: Response): Promise<Response | void> => {
  // check if there's some errors
  const errors = validationResult(req).array();
  if (errors?.length > 0) {
    return res.status(400).json({ message: errors[0].msg });
  }

  // after the task required info validation extract it from request
  const { taskTitle, taskDescription, expirationDate, creationDate, finished } = req.body;

  try {
    const userId = req.userId;
    const task = new TaskModel({
      userId,
      taskTitle,
      taskDescription,
      creationDate,
      expirationDate,
      finished,
    });

    await task.save();

    return res.status(200).json({ message: "Task created.", task });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong during task creation" });
  }
};

/**
 * updateTask - @async function that updates the user task using its ID.
 *
 * @param req Express Request to update a specific task using its ID.
 * @param res Express Response to notify with the result message.
 * @returns Express Response with status code:
 *             - 200 success update
 *             - 401 for bad request
 *             - 500 other failed errors
 */
const updateTask = async (req: Request, res: Response): Promise<Response | void> => {
  // check if there is some errors
  const errors = validationResult(req.params).array();
  if (errors && errors.length > 0) {
    return res.status(401).json({ message: errors[0].msg });
  }

  try {
    const taskId = req.params.taskId;
    const task: Task = req.body;

    if (task.userId !== req.userId) {
      return res
        .status(401)
        .json({ message: "Bad request. Task could be updates just by its owner!" });
    }

    const updated = await TaskModel.findByIdAndUpdate(taskId, task);
    if (!updated) return res.status(404).json({ message: "Task not found!" });

    res.status(200).json({ message: "Task updated successfully." });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong during the task update!" });
  }
};

/**
 * singleTask - @async function that returns the user task using its ID.
 *
 * @param req Express Request to returns a specific task using its ID.
 * @param res Express Response to notify with the result message.
 * @returns Express Response with status code:
 *             - 200 task data
 *             - 401 for bad request
 *             - 404 for task ID not found
 *             - 500 other failed errors
 */
const singleTask = async (req: Request, res: Response): Promise<Response | void> => {
  const errors = validationResult(req).array();
  if (errors?.length > 0) return res.status(401).json({ message: errors[0].msg });

  try {
    const taskId = req.params.taskId;
    const userId = req.userId;
    if (!taskId) throw new Error("Invalid Task ID!");

    const task = await TaskModel.findOne({ userId: userId, _id: taskId });
    if (!task) return res.status(404).json({ message: "Task not found!" });

    return res.status(200).json(task);
  } catch (error) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

/**
 * deleteTask - @async function that deletes a specific task from Database.
 *
 * @param req Express Request to delete a specific task by its ID.
 * @param res Express Response of the action taken with next status codes:
 *            - 500 deletion failed, if an error occured
 *            - 401 deletion failed, task info and user ID not matched
 *            - 404 deletion failed, task not found on DB
 *            - 200 deletion success
 * @returns Express Response.
 */
const deleteTask = async (req: Request, res: Response): Promise<Response | void> => {
  const errors = validationResult(req).array();
  if (errors?.length > 0) return res.status(401).json({ message: errors[0].msg });

  try {
    const _id = req.params.taskId;
    const userId = req.userId;

    const task = await TaskModel.findOneAndDelete({ _id, userId });
    if (!task) return res.status(404).json({ message: "Task not found" });

    res.status(200).json({ message: "Task deleted.", task });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong during the task deletion!" });
  }
};

export default { userTasks, createTask, updateTask, singleTask, deleteTask };

import express from "express";
import verifyToken from "../Middleware/AuthMiddleware";
import taskController from "../Controllers/TaskController";
import { body, param } from "express-validator";

const router = express.Router();

// /api/task/
router.get(
  "/",
  verifyToken as express.RequestHandler,
  taskController.userTasks as express.RequestHandler
);

// /api/task/create
router.put(
  "/create",
  [
    body("taskTitle")
      .isString()
      .notEmpty()
      .withMessage("Eeach task should has a Title. Please fill all required fields and try again"),
    body("taskDescription")
      .isString()
      .notEmpty()
      .withMessage(
        "Eeach task should has a Description. Please fill all required fields and try again"
      ),
    body("expirationDate")
      .isString()
      .notEmpty()
      .withMessage(
        "Eeach task should has an Expiration Date. Please fill all required fields and try again"
      ),
    body("creationDate")
      .isString()
      .notEmpty()
      .withMessage(
        "Eeach task should has an Creation Date. Please fill all required fields and try again"
      ),
    body("finished")
      .isBoolean()
      .notEmpty()
      .withMessage(
        "Eeach task should has an Finished Status. Please fill all required fields and try again"
      ),
  ],
  verifyToken as express.RequestHandler,
  taskController.createTask as express.RequestHandler
);

// /api/task/:taskId
router.get(
  "/:taskId",
  [param("taskId").isString().notEmpty().withMessage("Invalid Task ID!")],
  verifyToken as express.RequestHandler,
  taskController.singleTask as express.RequestHandler
);

// /api/task/update:taskId
router.put(
  "/update/:taskId",
  [
    param("taskId").isString().notEmpty().withMessage("Bad request! Task ID should be included."),
    body("taskTitle").isString().notEmpty().withMessage("Title could not be empty!"),
    body("taskDescription").isString().notEmpty().withMessage("Description could not be empty!"),
    body("expirationDate").isString().notEmpty().withMessage("Expiration Date could not be empty!"),
    body("creationDate").isString().notEmpty().withMessage("Creation Date could not be empty!"),
  ],
  verifyToken as express.RequestHandler,
  taskController.updateTask as express.RequestHandler
);

// /api/task/delete/:taskId
router.delete(
  "/delete/:taskId",
  [param("taskId").isString().notEmpty().withMessage("Task ID not valid!")],
  verifyToken as express.RequestHandler,
  taskController.deleteTask as express.RequestHandler
);

export default router;

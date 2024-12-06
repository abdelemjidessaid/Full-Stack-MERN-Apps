import express, { Request, Response } from "express";
import verifyToken from "../Middleware/AuthMiddleware";
import userController from "../Controllers/UserController";
import { body, param } from "express-validator";

const router = express.Router();

// /api/profile
router.get(
  "/profile",
  verifyToken as express.RequestHandler,
  userController.currentUser as express.RequestHandler
);

// /api/update/:userId
router.post(
  "/update-profile",
  [
    body("username").notEmpty().isString().withMessage("User name is required!"),
    body("password")
      .notEmpty()
      .isString()
      .withMessage("User name is required!")
      .isLength({ min: 8 })
      .withMessage("Password should contains at least 8 characters!"),
  ],
  verifyToken as express.RequestHandler,
  userController.updateUser as express.RequestHandler
);

export default router;

import express, { Handler, Request, RequestHandler, Response } from "express";
import controller from "../Controllers/UserController";
import { body } from "express-validator";
import verifyToken from "../Middleware/AuthMiddleware";

const router = express.Router();

// /api/auth/register - path for user registeration.
router.post(
  "/register",
  [
    body("username").isString().notEmpty().withMessage("User name can not be empty!"),
    body("email").isEmail().withMessage("Email address is required, please enter a valid one!"),
    body("password")
      .isString()
      .trim()
      .isLength({ min: 8 })
      .withMessage("Password is required, can not be empty or less than 8 characters and digits!"),
  ],
  controller.registerUser as express.RequestHandler
);

// /api/auth/login - path for user log-in.
router.post(
  "/login",
  [
    body("email").isEmail().not().withMessage("Invalid Email address!"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Invalid Password, must contains 8 characters or more!"),
  ],
  controller.loginUser as express.RequestHandler
);

// /api/auth/validate-token - path to validate token
router.post(
  "/validate-token",
  verifyToken as express.RequestHandler,
  (async (req: Request, res: Response): Promise<Response | void> => {
    res.status(200).json({ message: "valide token." });
  }) as express.RequestHandler
);

// /api/auth/logout - path to logout
router.post("/logout", async (req: Request, res: Response) => {
  res.cookie("auth_token", "", {
    expires: new Date(0),
  });

  res.send();
});

export default router;

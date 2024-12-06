import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import UserModel from "../Models/User";

/**
 * registerUser - function that creates new account if it's not registered before.
 *
 * @param req Express Request - register request contains (username, email, password) to create
 *            account if it is not exists.
 * @param res Express Response - register response contains registeration token in cookie if
 *            the account created successfully, error messages otherwise.
 * @returns   Promise of type Express Response or void.
 */
const registerUser = async (req: Request, res: Response): Promise<Response | void> => {
  const { username, email, password } = req.body;

  try {
    const valResult = validationResult(req);

    if (valResult.array().length > 0) return res.status(400).json({ message: valResult.array() });

    let user = await UserModel.findOne({ email: email });

    if (user) return res.status(400).json({ message: "User already exists!" });

    const hashedPass = await bcrypt.hash(password, 10);

    user = new UserModel({ username, email, password: hashedPass });
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_KEY as string, {
      expiresIn: "1d",
    });

    res.cookie("auth_token", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000 * 24,
      secure: process.env.NODE_ENV === "production",
    });

    return res.status(200).json({ message: "User registered successfully." });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to save user to the database. Please try again later." });
  }
};

/**
 * loginUser - async function for user login.
 *
 * @param req Express Request - request contains user credentials (email, password) for login.
 * @param res Express Response - response contains authentication token if valid credentials,
 *            error message otherwise.
 * @returns Express Response or void.
 */
const loginUser = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    // check if there is some credential errors
    const validCredentials = validationResult(req);
    if (validCredentials?.array().length > 0) {
      return res.status(400).json({ message: validCredentials.array() });
    }

    // extract login (email and password).
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message:
          "User not found, please enter a valid information or create new account if you are not registered.",
      });
    }

    const correctPassword = await bcrypt.compare(password, user.password);
    if (!correctPassword) return res.status(400).json({ message: "Invalid credentials!" });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_KEY as string, { expiresIn: "1d" });
    res.cookie("auth_token", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000 * 24,
      secure: process.env.NODE_ENV === "production",
    });

    return res.status(200).json({ message: "Logged in successfully." });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong during the log-in proccess!" });
  }
};

/**
 * currentUser - @async function that returns the current user information.
 *
 * @param req Express Request request the user information using the User ID.
 * @param res Express Response response with the user information.
 *
 * @returns user information with status 200, error message with status 500 if
 *          it's failed.
 */
const currentUser = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const userId = req.userId;

    const user = await UserModel.findOne({ _id: userId });
    if (!user) return res.status(404).json({ message: "User not found!" });

    const info = user.toJSON();
    info.password = "";

    res.json(info);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch user information!" });
  }
};

/**
 * updateUser @async function that updates the user information.
 *
 * @param req Express request that contains the user info.
 * @param res Express response.
 *
 * @returns response with status of:
 *            - 200 if the user updated.
 *            - 500 if an internal error
 *            - 404 if the user not found.
 *            - 401 if an unauthorized.
 */
const updateUser = async (req: Request, res: Response): Promise<Response | void> => {
  const errors = validationResult(req).array();
  if (errors?.length > 0) return res.status(401).json({ message: errors[0].msg });

  try {
    const userId = req.body._id;
    if (userId !== req.userId) return res.status(401).json({ message: "Unauthorized request!" });

    const user = await UserModel.findOne({ _id: userId });
    const correctPassword = await bcrypt.compare(req.body.password, user?.password as string);
    if (!correctPassword) return res.status(401).json({ message: "Invalide credentials!" });

    const updated = await UserModel.findByIdAndUpdate(userId, {
      username: req.body.username,
    });

    res.status(200).json({ message: updated ? "Profile updated." : "Profile not updated!" });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong during the profile update!" });
  }
};

export default { registerUser, loginUser, currentUser, updateUser };

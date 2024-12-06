import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import authRouter from "./Routes/AuthRouter";
import taskRouter from "./Routes/TaskRouter";
import userRouter from "./Routes/UserRouter";

const app = express();

// connect mongodb
const uri = process.env.MONGODB_CONNECTION as string;
mongoose
  .connect(uri)
  .then(() => console.log("MongoDB connected successfully."))
  .catch((error) => console.log(error));

const corsOptions = {
  origin: process.env.FRONT_END_URL, // Allow only this origin
  credentials: true, // Allow credentials like cookies, Authorization headers, etc.
};

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

app.get("/check-health", (req: Request, res: Response) => {
  res.send("Simple response from server for health testing.");
});

app.use("/api/auth", authRouter);
app.use("/api/task", taskRouter);
app.use("/api", userRouter);

app.listen(7000, () => {
  console.log("Server Running on http://localhost:7000");
});

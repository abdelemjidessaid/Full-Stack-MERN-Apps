import mongoose, { Schema, Model } from "mongoose";
import { User } from "../Types/User";

const userSchema: Schema<User> = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const UserModel: Model<User> = mongoose.model<User>("User", userSchema);

export default UserModel;

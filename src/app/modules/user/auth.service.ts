import { User } from "./auth.model";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { IUser } from "./auth.interface";
import config from "../../config";


// Register new user
const registerUser = async (userData: IUser) => {
  const { email, password } = userData;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }

  // password hash will be handled by pre-save hook
  const user = new User({ email, password });
  await user.save();

  return {
    id: user._id,
    email: user.email,
  };
};



export const authService = {
  registerUser,
  
};
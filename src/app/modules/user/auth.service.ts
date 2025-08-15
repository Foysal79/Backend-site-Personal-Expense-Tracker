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


// Login user
const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid credentials");
  }

  // Compare passwords
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  // Generate JWT token
  const token = jwt.sign(
    { id: user._id, email: user.email },
    config.jwt_secret as string,
    { expiresIn: "1d" }
  );

  return {
    token,
    user: {
      id: user._id,
      email: user.email,
    },
  };
};

export const authService = {
  registerUser,
  loginUser,
};
import { Request, Response } from "express";
import { authService } from "./auth.service";

const registerUser = async (req: Request, res: Response) => {
  try {
    const user = await authService.registerUser(req.body);
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message || "Registration failed",
    });
  }
};

const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await authService.loginUser(email, password);
    res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (err: any) {
    res.status(401).json({
      success: false,
      message: err.message || "Login failed",
    });
  }
};

export const authController = {
  registerUser,
  loginUser,
};

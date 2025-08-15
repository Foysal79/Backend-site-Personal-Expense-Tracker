import { Request, Response } from "express";
import { createExpense, getAllExpensesByUser, updateExpense, deleteExpense } from "./expense.service";
import { Types } from "mongoose";

export const addExpense = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const expense = await createExpense({
      ...req.body,
      userId: new Types.ObjectId(user.id),
      date: new Date(req.body.date),
    });
    res.status(201).json({ success: true, data: expense });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const fetchExpenses = async (req: Request, res: Response) => {
  const user = (req as any).user;
  const expenses = await getAllExpensesByUser(user.id);
  res.status(200).json({ success: true, data: expenses });
};

export const editExpense = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const data = req.body;
    if (data.date) data.date = new Date(data.date);

    const expense = await updateExpense(req.params.id, user.id, data);
    if (!expense) return res.status(404).json({ success: false, message: "Expense not found" });

    res.status(200).json({ success: true, data: expense });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const removeExpense = async (req: Request, res: Response) => {
  const user = (req as any).user;
  const expense = await deleteExpense(req.params.id, user.id);
  if (!expense) return res.status(404).json({ success: false, message: "Expense not found" });

  res.status(200).json({ success: true, message: "Expense deleted successfully" });
};

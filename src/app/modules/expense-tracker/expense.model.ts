import { Schema, model, Types } from "mongoose";
import { IExpenseCreate } from "./expense.interface";

const ExpenseSchema = new Schema<IExpenseCreate>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true, // user reference
    },
    title: { type: String, required: true },
    amount: { type: Number, required: true },
    category: { type: String, required: true },
    date: { type: String, required: true },
  },
  { timestamps: true }
);

export const Expense = model<IExpenseCreate>("Expense", ExpenseSchema);

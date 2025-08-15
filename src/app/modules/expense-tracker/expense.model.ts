import { Schema, model, Types } from "mongoose";
import { IExpenseCreate } from "./expense.interface";

const ExpenseSchema = new Schema<IExpenseCreate>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      minlength: [3, "Title must be at least 3 characters long"],
      trim: true,
    },
    amount: {
      type: Number,
      required: [true, "Amount is required"],
      min: [0.01, "Amount must be greater than 0"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
    },
    date: {
      type: String,
      required: [true, "Date is required"],
    },
  },
  { timestamps: true }
);

export const Expense = model<IExpenseCreate>("Expense", ExpenseSchema);

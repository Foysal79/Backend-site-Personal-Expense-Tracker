import { Types } from "mongoose";

export type IExpense = {
  userId: Types.ObjectId;
  title: string;
  amount: number;
  category: string;
  date: string;
};

export type IExpenseCreate = {
  userId: Types.ObjectId;
  title: string;
  amount: number;
  category: string;
  date: string;
};

export type IExpenseUpdate = {
  title?: string;
  amount?: number;
  category?: string;
  date?: string;
};

import { IExpenseCreate } from "./expense.interface";
import { Types } from "mongoose";
import { Expense } from "./expense.model";

 const createExpense = async (data: IExpenseCreate) => {
  const expense = new Expense(data);
  await expense.save();
  return expense;
};

 const getAllExpensesByUser = async (userId: string | Types.ObjectId) => {
  return await Expense.find({ userId });
};

 const updateExpense = async (
  id: string,
  userId: string | Types.ObjectId,
  data: Partial<IExpenseCreate>
) => {
  return await Expense.findOneAndUpdate({ _id: id, userId }, data, { new: true });
};

const deleteExpense = async (
  id: string,
  userId: string | Types.ObjectId
) => {
  return await Expense.findOneAndDelete({ _id: id, userId });
};


export const expenseService = {
    createExpense,
    getAllExpensesByUser,
    updateExpense,
    deleteExpense

}
export type IExpense = {
  title: string;
  amount: number;
  category: string;
  date: Date;
  userId?: string; // For JWT user relation
}

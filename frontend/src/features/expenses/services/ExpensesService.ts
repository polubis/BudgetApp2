import { firestore } from 'firebase';

import { Expense } from '..';

class ExpensesService {
  private _collection = 'expenses';

  public addExpense = (email: string, expense: Expense): Promise<void> =>
    firestore()
      .collection(this._collection)
      .doc(email)
      .collection(expense.date)
      .doc()
      .set(expense);
}

export const expensesService = new ExpensesService();

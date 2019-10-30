import { firestore } from 'firebase';

class ExpensesService {
  private _collection = 'expenses';

  public saveExpense = (email: string, expense: any) => {
    firestore()
      .collection(this._collection)
      .doc(email)
      .set(expense);
  };
}

export default new ExpensesService();

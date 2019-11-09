import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

import BaseService from './BaseService';
import { AddExpensePayload } from 'models/payloads';
import { ExpenseEntity, ExpensesByDateEntity } from 'models/entities';
import { expensesByYearMockResponse, expenseMock } from '__mocks__/responses';

class ExpensesService extends BaseService {
  private _expensesCache: { [key: number]: ExpensesByDateEntity } = {};

  public getExpensesByYear = (year: number): Observable<ExpensesByDateEntity> => {
    if (this._expensesCache.hasOwnProperty(year)) {
      return of(this._expensesCache[year]);
    }

    return this.simulate<ExpensesByDateEntity>(expensesByYearMockResponse).pipe(
      tap(expenses => (this._expensesCache = { ...this._expensesCache, [year]: expenses }))
    );
  };

  public addExpense = (expense: AddExpensePayload): Observable<ExpenseEntity> => {
    return this.simulate<ExpenseEntity>(expenseMock);
  };
}

export const expensesService = new ExpensesService();

import React, { useState, useCallback } from 'react';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AddExpensePayload } from 'models/payloads';
import { ExpenseEntity, ExpensesByDateEntity } from 'models/entities';
import { expensesService } from 'services';

export interface ProvidedExpensesContext {
  expenses: ExpensesByDateEntity;
  handleGetExpensesByYear(date: number): Observable<ExpensesByDateEntity>;
  handleAddExpense(expense: AddExpensePayload): Observable<ExpenseEntity>;
}

const Context = React.createContext<ProvidedExpensesContext>({
  expenses: {},
  handleGetExpensesByYear: () => of({}),
  handleAddExpense: () => of({} as any)
});

const ExpensesProvider: React.FC = ({ children }) => {
  const [expenses, setExpenses] = useState<ExpensesByDateEntity>({});

  const handleGetExpensesByYear = useCallback(
    (year: number): Observable<ExpensesByDateEntity> => expensesService.getExpensesByYear(year).pipe(tap(expenses => setExpenses(expenses))),
    []
  );

  const handleAddExpense = useCallback(
    (expensePayload: AddExpensePayload): Observable<ExpenseEntity> =>
      expensesService.addExpense(expensePayload).pipe(
        tap(expense => {
          // TODO: Remove this code after BE implementation
          const newExpenses: ExpensesByDateEntity = { ...expenses };
          const areExpensesAddedForGivenDate: boolean = Array.isArray(newExpenses[expense.date]);

          newExpenses[expensePayload.date] = areExpensesAddedForGivenDate ? [...newExpenses[expense.date], expense] : [expense];
          setExpenses(newExpenses);
        })
      ),
    [expenses]
  );

  return (
    <Context.Provider
      value={{
        expenses,
        handleGetExpensesByYear,
        handleAddExpense
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { Context as ExpensesContext };

export default ExpensesProvider;

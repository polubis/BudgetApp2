import React, { useState, useCallback } from 'react';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AddExpensePayload, UpdateMonthlyLimitPayload } from 'models/payloads';
import { ExpenseEntity, ExpensesByDateEntity } from 'models/entities';
import { expensesService } from 'services';

export interface ProvidedExpensesContext {
  expenses: ExpensesByDateEntity;
  handleGetExpensesByYear(date: number): Observable<ExpensesByDateEntity>;
  handleAddExpense(expense: AddExpensePayload): Observable<ExpenseEntity>;
  handleUpdateMonthlyLimit(updateMonthlyLimitPayload: UpdateMonthlyLimitPayload, setForEachMonthInYear: boolean): Observable<null>;
}

const Context = React.createContext<ProvidedExpensesContext>({
  expenses: {},
  handleGetExpensesByYear: () => of({}),
  handleAddExpense: () => of({} as any),
  handleUpdateMonthlyLimit: () => of(null)
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
        tap(() => {
          // TODO: Remove this code after BE implementation
          const newExpenses: ExpensesByDateEntity = { ...expenses };
          const areExpensesAddedForGivenDate: boolean = Array.isArray(newExpenses[expensePayload.date]);

          newExpenses[expensePayload.date] = areExpensesAddedForGivenDate
            ? [...newExpenses[expensePayload.date], { ...expensePayload, id: 10000 }]
            : [{ ...expensePayload, id: 10000 }];
          setExpenses(newExpenses);
        })
      ),
    [expenses]
  );

  const handleUpdateMonthlyLimit = useCallback(
    (updateMonthlyLimitPayload: UpdateMonthlyLimitPayload, setForEachMonthInYear: boolean): Observable<null> =>
      expensesService.updateMonthlyLimit(updateMonthlyLimitPayload, setForEachMonthInYear),
    []
  );

  return (
    <Context.Provider
      value={{
        expenses,
        handleGetExpensesByYear,
        handleAddExpense,
        handleUpdateMonthlyLimit
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { Context as ExpensesContext };

export default ExpensesProvider;

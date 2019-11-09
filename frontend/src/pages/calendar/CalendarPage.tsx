import React, { useState, useCallback } from 'react';
import moment from 'moment';

import Calendar from './calendar/Calendar';
import ExpenseFormDialog from './expense-form-dialog/expense-form-dialog';
import Header from './header/header';

import ExpensesProvider from 'providers/ExpensesProvider';
import { useCalendarPageNavigation } from './useCalendarPageNavigation';

import './CalendarPage.scss';

const CalendarPage: React.FC = () => {
  const [expenseFormDialogState, setExpenseFormDialogState] = useState<Partial<{ open: boolean; payload: any }>>({});
  const { month, year, setQuery } = useCalendarPageNavigation();

  const setMonth = (e: React.MouseEvent<HTMLButtonElement>): void => {
    const monthIdx: number = +e.currentTarget.getAttribute('data-idx')!;
    setQuery(monthIdx + 1, year);
  };

  const setYear = (year: number): void => {
    setQuery(month, year);
  };

  const setAsToday = (): void => {
    const now = moment();
    setQuery(now.month() + 1, now.year());
  };

  const startAddingExpense = useCallback((): void => {
    setExpenseFormDialogState({ open: true });
  }, []);

  const closeExpenseFormDialog = useCallback((): void => {
    setExpenseFormDialogState({});
  }, []);

  return (
    <div id='calendar-page'>
      <Header
        activeMonth={month}
        activeYear={year}
        onYearChange={setYear}
        onMonthChange={setMonth}
        onSetAsToday={setAsToday}
        onStartAddingExpense={startAddingExpense}
      />

      <Calendar activeMonth={month} activeYear={year} />

      {expenseFormDialogState.open && <ExpenseFormDialog onDialogClose={closeExpenseFormDialog} />}
    </div>
  );
};

const ConnectedCalendarPage: React.FC = () => (
  <ExpensesProvider>
    <CalendarPage />
  </ExpensesProvider>
);

export default ConnectedCalendarPage;

import React, { useState, useCallback } from 'react';
import moment from 'moment';

import { Button } from '@material-ui/core';

import Days from './days/days';
import ExpenseFormDialog from './expense-form-dialog/expense-form-dialog';
import Labels from './labels/labels';
import Months from './months/months';
import YearPicker from './year-picker/year-picker';

import ExpensesProvider from 'providers/ExpensesProvider';
import { MONTH_NAMES } from 'models/consts/DateAndTime';
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
    <>
      <div id='calendar-page'>
        <nav className='date-navigation row'>
          <h2>
            {MONTH_NAMES[month - 1]} {year}
          </h2>

          <YearPicker activeYear={year} onYearChange={setYear} />

          <span className='divider' />

          <Months activeMonth={month} onMonthClick={setMonth} />

          <span className='divider' />

          <Button onClick={setAsToday} className='today-btn'>
            Today
          </Button>
        </nav>

        <section className='management-and-filters'>
          <Button onClick={startAddingExpense} className='add-expense-btn'>
            Add expense
          </Button>
        </section>

        <Labels />

        <Days activeMonth={month} activeYear={year} />
      </div>

      {expenseFormDialogState.open && <ExpenseFormDialog onDialogClose={closeExpenseFormDialog} />}
    </>
  );
};

const ConnectedCalendarPage: React.FC = () => (
  <ExpensesProvider>
    <CalendarPage />
  </ExpensesProvider>
);

export default ConnectedCalendarPage;

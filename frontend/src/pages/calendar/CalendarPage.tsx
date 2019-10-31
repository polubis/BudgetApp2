import React, { useState, useCallback } from 'react';
import moment from 'moment';

import { Button } from '@material-ui/core';

import Days from './days/days';
import ExpenseFormDialog from './expense-form-dialog/expense-form-dialog';
import Labels from './labels/labels';
import Months from './months/months';
import Sidebar from 'pages/calendar/sidebar/sidebar';
import YearPicker from './year-picker/year-picker';

import { MONTH_NAMES } from 'features/date-time-management';
import { useCalendarPageNavigation } from './hooks/useCalendarPageNavigation';
import { WithPermissions } from 'features/authorization';

import './CalendarPage.scss';

const CalendarPage: React.FC = () => {
  const [selectedDateToAddExpense, setSelectedDateToAddExpense] = useState('');
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

  const openExpenseFormDialog = useCallback((e: React.MouseEvent<HTMLButtonElement>): void => {
    const date = e.currentTarget.getAttribute('data-attr-date')!;
    setSelectedDateToAddExpense(date);
  }, []);

  const closeExpenseFormDialog = useCallback((): void => {
    setSelectedDateToAddExpense('');
  }, []);

  return (
    <>
      <div className='row mh-100vh' id='calendar-page'>
        <Sidebar />
        <main>
          <section className='calendar'>
            <header className='row-c'>
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
            </header>

            <Labels />

            <Days activeMonth={month} activeYear={year} onAddExpenseClick={openExpenseFormDialog} />
          </section>
        </main>
      </div>

      {selectedDateToAddExpense && <ExpenseFormDialog expensesDate={selectedDateToAddExpense} onDialogClose={closeExpenseFormDialog} />}
    </>
  );
};

export default WithPermissions(CalendarPage);

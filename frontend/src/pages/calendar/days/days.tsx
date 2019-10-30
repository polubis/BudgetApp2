import React, { useState } from 'react';
import moment from 'moment';

import Day from './day/Day';
import ExpenseFormDialog from '../expense-form-dialog/expense-form-dialog';
import { DAYS_IN_WEEK_COUNT } from '../utils/dateAndTime';

import './days.scss';

type DaysProps = {
  activeMonth: number;
  activeYear: number;
};

const Days: React.FC<DaysProps> = ({ activeMonth, activeYear }) => {
  const [isExpenseFormDialogOpen, setIsExpenseFormDialogOpen] = useState(false);

  const openExpenseFormDialog = () => {
    setIsExpenseFormDialogOpen(true);
  };

  const closeExpenseFormDialog = () => {
    setIsExpenseFormDialogOpen(false);
  };

  const activeDate = moment()
    .month(activeMonth - 1)
    .year(activeYear);

  const renderDays = (): JSX.Element[] => {
    const leftBlanks = () => {
      const blanks: JSX.Element[] = [];

      const firstDayOfMonth: number = +moment(activeDate)
        .startOf('month')
        .format('d');

      const numberOfDaysInPreviousMonth: number = moment(activeDate)
        .subtract(1, 'month')
        .daysInMonth();

      const startDay = numberOfDaysInPreviousMonth - firstDayOfMonth + 1;

      for (let d = 0; d < firstDayOfMonth; d++) {
        blanks.push(<Day key={'leftBlank' + d} dayNumber={startDay + d} additionalClasses='blank' onAddExpenseClick={openExpenseFormDialog} />);
      }

      return blanks;
    };

    const days = () => {
      const days: JSX.Element[] = [];

      const today = moment();
      const todayDay: number = +today.format('D');
      const todayMonth: number = +today.format('MM');
      const todayYear: number = today.year();

      for (let d = 1; d <= activeDate.daysInMonth(); d++) {
        days.push(
          <Day
            key={'day' + d}
            dayNumber={d}
            additionalClasses={todayYear === activeYear && todayMonth === activeMonth && todayDay === d ? 'today' : ''}
            onAddExpenseClick={openExpenseFormDialog}
          />
        );
      }

      return days;
    };

    const leftBlanksAndDays: JSX.Element[] = [...leftBlanks(), ...days()];

    const rightBlanks = () => {
      const blanks: JSX.Element[] = [];
      const limit = DAYS_IN_WEEK_COUNT - (leftBlanksAndDays.length % DAYS_IN_WEEK_COUNT);

      for (let d = 1; d <= limit; d++) {
        blanks.push(<Day key={'rightBlank' + d} dayNumber={d} additionalClasses='blank' onAddExpenseClick={openExpenseFormDialog} />);
      }

      return blanks;
    };

    return [...leftBlanksAndDays, ...rightBlanks()];
  };

  return (
    <>
      <div className='days'>{renderDays()}</div>
      <ExpenseFormDialog isDialogOpen={isExpenseFormDialogOpen} onDialogClose={closeExpenseFormDialog} />
    </>
  );
};

export default Days;

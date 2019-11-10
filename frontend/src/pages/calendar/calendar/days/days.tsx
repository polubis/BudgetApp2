import React from 'react';
import moment from 'moment';

import Day from './day/day';

import { ExpensesByDateEntity } from 'models/entities';
import { getFirstDayOfMonth, getNumberOfDaysInMonth, toStringMonth, toStringDay } from 'helpers/dateAndTime';
import { FIRST_MONTH, DAYS_IN_WEEK_COUNT, LAST_MONTH } from 'models/others';

import './days.scss';

interface DaysProps {
  expenses: ExpensesByDateEntity;
  activeMonth: number;
  activeYear: number;
}

const Days: React.FC<DaysProps> = ({ expenses, activeMonth, activeYear }) => {
  const activeDate = moment()
    .month(activeMonth - 1)
    .year(activeYear);

  const renderLeftBlanks = (): JSX.Element[] => {
    const blanks: JSX.Element[] = [];
    const firstDayOfMonth: number = getFirstDayOfMonth(activeDate);
    const numberOfDaysInPreviousMonth: number = getNumberOfDaysInMonth(activeDate);
    const startDay: number = numberOfDaysInPreviousMonth - firstDayOfMonth + 1;

    let month: string = toStringMonth(activeMonth - 1);
    let year: number = activeYear;

    if (activeMonth === FIRST_MONTH) {
      month = '12';
      year = activeYear - 1;
    }

    for (let d = 0; d < firstDayOfMonth; d++) {
      const date: string = `${toStringDay(startDay + d)}/${month}/${year}`;

      blanks.push(<Day key={date} date={date} expenses={expenses[date]} additionalClasses='blank' />);
    }

    return blanks;
  };

  const renderDays = (): JSX.Element[] => {
    const days: JSX.Element[] = [];
    const today = moment();
    const todayDay: number = +today.format('D');
    const todayMonth: number = +today.format('MM');
    const todayYear: number = today.year();

    const isToday = (day: number): boolean => {
      return todayYear === activeYear && todayMonth === activeMonth && todayDay === day;
    };

    const month: string = toStringMonth(activeMonth);

    for (let d = 1; d <= activeDate.daysInMonth(); d++) {
      const date: string = `${toStringDay(d)}/${month}/${activeYear}`;

      days.push(<Day key={date} date={date} expenses={expenses[date]} additionalClasses={isToday(d) ? 'today' : ''} />);
    }

    return days;
  };

  const leftBlanks: JSX.Element[] = renderLeftBlanks();
  const days: JSX.Element[] = renderDays();

  const renderRightBlanks = (): JSX.Element[] => {
    const blanks: JSX.Element[] = [];
    const limit: number = DAYS_IN_WEEK_COUNT - ((leftBlanks.length + days.length) % DAYS_IN_WEEK_COUNT);

    let month: string = toStringMonth(activeMonth + 1);
    let year: number = activeYear;

    if (activeMonth === LAST_MONTH) {
      month = '01';
      year = activeYear + 1;
    }

    for (let d = 1; d <= limit; d++) {
      const date: string = `${toStringDay(d)}/${month}/${year}`;

      blanks.push(<Day key={date} date={date} expenses={expenses[date]} additionalClasses='blank' />);
    }

    return blanks;
  };

  const rightBlanks: JSX.Element[] = renderRightBlanks();

  return (
    <div className='days'>
      {leftBlanks}
      {days}
      {rightBlanks}
    </div>
  );
};

export default Days;

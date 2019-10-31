import React, { memo } from 'react';
import moment from 'moment';

import Day from './day/day';
import {
  DAYS_IN_WEEK_COUNT,
  FIRST_MONTH,
  LAST_MONTH,
  getNumberOfDaysInMonth,
  getFirstDayOfMonth,
  toStringDay,
  toStringMonth
} from 'features/date-time-management';

import './days.scss';

type DaysProps = {
  activeMonth: number;
  activeYear: number;
  onAddExpenseClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const Days: React.FC<DaysProps> = ({ activeMonth, activeYear, onAddExpenseClick }) => {
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
      blanks.push(
        <Day
          key={'leftBlank' + d}
          day={toStringDay(startDay + d)}
          month={month}
          year={year}
          additionalClasses='blank'
          onAddExpenseClick={onAddExpenseClick}
        />
      );
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

    for (let d = 1; d <= activeDate.daysInMonth(); d++) {
      days.push(
        <Day
          key={d}
          day={toStringDay(d)}
          month={toStringMonth(activeMonth)}
          year={activeYear}
          additionalClasses={isToday(d) ? 'today' : ''}
          onAddExpenseClick={onAddExpenseClick}
        />
      );
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
      blanks.push(
        <Day
          key={d + 'rightBlank'}
          day={toStringDay(d)}
          month={month}
          year={year}
          additionalClasses='blank'
          onAddExpenseClick={onAddExpenseClick}
        />
      );
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

export default memo(Days, (prev, next) => prev.activeMonth === next.activeMonth && prev.activeYear === next.activeYear);

import React, { memo } from 'react';

import { Button } from '@material-ui/core';

import Months from './months/months';
import YearPicker from './year-picker/year-picker';

import { MONTH_NAMES } from 'models/consts/DateAndTime';

import './header.scss';

interface HeaderProps {
  activeMonth: number;
  activeYear: number;
  onYearChange: (year: number) => void;
  onMonthChange: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onSetAsToday: () => void;
  onStartAddingExpense: () => void;
}

const Header: React.FC<HeaderProps> = ({ activeMonth, activeYear, onYearChange, onMonthChange, onSetAsToday, onStartAddingExpense }) => {
  return (
    <>
      <nav className='date-navigation row'>
        <h2>
          {MONTH_NAMES[activeMonth - 1]} {activeYear}
        </h2>

        <YearPicker activeYear={activeYear} onYearChange={onYearChange} />

        <span className='divider' />

        <Months activeMonth={activeMonth} onMonthChange={onMonthChange} />

        <span className='divider' />

        <Button onClick={onSetAsToday} className='today-btn'>
          Today
        </Button>
      </nav>

      <section className='management-and-filters'>
        <Button onClick={onStartAddingExpense} className='add-expense-btn'>
          Add expense
        </Button>
      </section>
    </>
  );
};

export default memo(Header);

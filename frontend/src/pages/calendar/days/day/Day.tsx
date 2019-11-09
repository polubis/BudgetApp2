import React from 'react';

import { Chip } from '@material-ui/core';

import { ExpenseEntity } from 'models/entities';

import './day.scss';

interface DayProps {
  expenses: ExpenseEntity[];
  date: string;
  additionalClasses: string;
}

const Day: React.FC<DayProps> = ({ date, expenses, additionalClasses }) => {
  return (
    <div className={`day col ${additionalClasses}`}>
      <div className='expenses wrap'>
        {expenses && expenses.map(expense => <Chip key={expense.id} variant='outlined' color='primary' label={expense.cost} />)}
      </div>
      <footer className='toolbox row'>
        <span className='date centered'>{date}</span>
      </footer>
    </div>
  );
};

export default Day;

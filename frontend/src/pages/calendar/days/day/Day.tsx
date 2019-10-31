import React from 'react';

import { Chip, IconButton, Tooltip } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';

import './day.scss';

type DayProps = {
  day: string;
  month: string;
  year: number;
  additionalClasses: string;
  onAddExpenseClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const Day: React.FC<DayProps> = ({ day, month, year, additionalClasses, onAddExpenseClick }) => {
  const date: string = `${day}-${month}-${year}`;

  return (
    <div className={`day col ${additionalClasses}`}>
      <div className='expenses wrap'>
        <Chip variant='outlined' color='primary' label='43' />
        <Chip variant='outlined' color='primary' label='4.33' />
        <Chip variant='outlined' color='primary' label='4.33' />
        <Chip variant='outlined' color='primary' label='4.33' />
        <Chip variant='outlined' color='primary' label='4.33' />
      </div>
      <footer className='toolbox row'>
        <span className='date row-c-c'>{date}</span>
        <Tooltip title='Add new expense'>
          <IconButton data-attr-date={date} className='add-expense-btn' aria-label='delete' size='small' onClick={onAddExpenseClick}>
            <AddIcon />
          </IconButton>
        </Tooltip>
      </footer>
    </div>
  );
};

export default Day;

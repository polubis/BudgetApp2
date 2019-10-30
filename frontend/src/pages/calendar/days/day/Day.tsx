import React from 'react';

import { Chip, IconButton, Tooltip } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';

import './Day.scss';

type DayProps = {
  dayNumber: number;
  additionalClasses: string;
  onAddExpenseClick: () => void;
};

const Day: React.FC<DayProps> = ({ dayNumber, additionalClasses, onAddExpenseClick }) => {
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
        <span className='number row-c-c'>{dayNumber}</span>
        <Tooltip title='Add new expense'>
          <IconButton onClick={onAddExpenseClick} className='add-expense-btn' aria-label='delete' size='small'>
            <AddIcon />
          </IconButton>
        </Tooltip>
      </footer>
    </div>
  );
};

export default Day;

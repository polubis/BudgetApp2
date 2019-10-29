import React from 'react';

import { Chip } from '@material-ui/core';

import './Day.scss';

type DayProps = {
  dayNumber: number;
  additionalClasses: string;
};

const Day: React.FC<DayProps> = ({ dayNumber, additionalClasses }) => {
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
      </footer>
    </div>
  );
};

export default Day;

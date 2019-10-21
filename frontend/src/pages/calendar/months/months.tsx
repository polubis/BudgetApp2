import React from 'react';

import { Button, Tooltip } from '@material-ui/core';

import { MONTH_SYMBOLS, MONTH_NAMES } from 'pages/calendar/utils/dateAndTime';

import './months.scss';

type MonthsProps = {
  activeMonth: number;
  onMonthClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const Months: React.FC<MonthsProps> = ({ activeMonth, onMonthClick }) => {
  return (
    <div className='months'>
      {MONTH_SYMBOLS.map((msymbol, idx) => (
        <Tooltip key={msymbol} title={MONTH_NAMES[idx]}>
          <Button data-idx={idx} onClick={onMonthClick} className={`month ${activeMonth - 1 === idx ? 'current' : ''}`}>
            {msymbol}
          </Button>
        </Tooltip>
      ))}
    </div>
  );
};

export default Months;

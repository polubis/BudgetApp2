import React, { useState, useEffect, useContext, memo } from 'react';
import { finalize } from 'rxjs/operators';

import Backdrop from 'components/backdrop/backdrop';
import Days from './days/days';
import Labels from './labels/labels';

import { ExpensesContext, ProvidedExpensesContext } from 'providers/ExpensesProvider';

import './Calendar.scss';

interface CalendarProps {
  activeMonth: number;
  activeYear: number;
}

const Calendar: React.FC<CalendarProps> = ({ activeMonth, activeYear }) => {
  const [isLoadingExpenses, setIsLoadingExpenses] = useState(false);
  const { expenses, handleGetExpensesByYear }: ProvidedExpensesContext = useContext(ExpensesContext);
  
  useEffect(() => {
    setIsLoadingExpenses(true);
    handleGetExpensesByYear(activeYear)
      .pipe(finalize(() => setIsLoadingExpenses(false)))
      .subscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeYear]);

  return (
    <section className="calendar">
      <Labels />

      <div className='days-wrapper'>
        <Backdrop open={isLoadingExpenses} />
        <Days activeMonth={activeMonth} activeYear={activeYear} expenses={expenses} />
      </div>
    </section>
  );
};

export default memo(Calendar);

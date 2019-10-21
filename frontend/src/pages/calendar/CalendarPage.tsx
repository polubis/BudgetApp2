import React, { useEffect } from 'react';
import moment from 'moment';
import { useHistory } from 'react-router';

import { Button } from '@material-ui/core';

import Days from './days/days';
import Labels from './labels/labels';
import Months from './months/months';
import Sidebar from 'pages/calendar/sidebar/sidebar';
import YearPicker from './year-picker/year-picker';

import { MONTH_NAMES } from './utils/dateAndTime';
import { useCalendarDateParams, getCalendarUrl, useQuery } from './utils/routingAndNavigation';

import './CalendarPage.scss';

const CalendarPage: React.FC = () => {
  const query = useQuery();
  const history = useHistory();
  const { month, year } = useCalendarDateParams(query.get('month'), query.get('year'));

  useEffect(() => {
    history.replace(getCalendarUrl(month, year));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setMonth = (e: React.MouseEvent<HTMLButtonElement>): void => {
    const monthIdx: number = +e.currentTarget.getAttribute('data-idx')!;
    history.push(getCalendarUrl(monthIdx + 1, year));
  };

  const setYear = (year: number): void => {
    history.push(getCalendarUrl(month, year));
  };

  const setAsToday = (): void => {
    const now = moment();
    history.push(getCalendarUrl(now.month() + 1, now.year()));
  };

  return (
    <div className='row mh-100vh' id='calendar-page'>
      <Sidebar />
      <main>
        <section className='calendar co`l'>
          <header className='row-c'>
            <h2>
              {MONTH_NAMES[month - 1]} {year}
            </h2>

            <YearPicker activeYear={year} onYearChange={setYear} />

            <span className='divider' />

            <Months activeMonth={month} onMonthClick={setMonth} />

            <span className='divider' />

            <Button onClick={setAsToday} className='today-btn'>
              Today
            </Button>
          </header>

          <Labels />

          <Days activeMonth={month} activeYear={year} />
        </section>
      </main>
    </div>
  );
};

export default CalendarPage;

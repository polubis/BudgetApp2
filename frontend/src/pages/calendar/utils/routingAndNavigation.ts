import { useLocation } from 'react-router';
import moment from 'moment';

import { FIRST_MONTH, LAST_MONTH, MIN_YEAR, MAX_YEAR } from 'pages/calendar/utils/dateAndTime';
import { PAGES } from 'pages/Pages';

export type CalendarDateParams = {
  month: number;
  year: number;
};

export const useCalendarDateParams = (month: string | null, year: string | null): CalendarDateParams => {
  const now = moment();
  let parsedMonth = now.month() + 1;
  let parsedYear = now.year();

  if (month !== null) {
    const nMonth = +month;

    if (!isNaN(nMonth) && nMonth >= FIRST_MONTH && nMonth <= LAST_MONTH) {
      parsedMonth = nMonth;
    }
  }

  if (year !== null) {
    const nYear = +year;

    if (!isNaN(nYear) && nYear >= MIN_YEAR && nYear <= MAX_YEAR) {
      parsedYear = nYear;
    }
  }

  return { month: parsedMonth, year: parsedYear };
};

export const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

export const getCalendarUrl = (month: number, year: number): string => {
  return `${PAGES.CALENDAR}?month=${month}&year=${year}`;
};

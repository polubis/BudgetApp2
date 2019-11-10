import { useEffect } from 'react';
import moment from 'moment';
import { useHistory, useLocation } from 'react-router';

import { FIRST_MONTH, LAST_MONTH, MIN_YEAR, MAX_YEAR } from 'models/others';
import { PAGES } from 'models/routing';

interface NavigationQueries {
  month: number;
  year: number;
}

interface UseCalendarPageNavigation extends NavigationQueries {
  setQuery: (month: number, year: number, shouldReplace?: boolean) => void;
}

export const useCalendarPageNavigation = (): UseCalendarPageNavigation => {
  const history = useHistory();
  const query = new URLSearchParams(useLocation().search);

  const getQuery = (month: string | null, year: string | null): NavigationQueries => {
    const now = moment();
    let parsedMonth: number = now.month() + 1;
    let parsedYear: number = now.year();

    if (month !== null) {
      const nMonth: number = +month;

      if (!isNaN(nMonth) && nMonth >= FIRST_MONTH && nMonth <= LAST_MONTH) {
        parsedMonth = nMonth;
      }
    }

    if (year !== null) {
      const nYear: number = +year;

      if (!isNaN(nYear) && nYear >= MIN_YEAR && nYear <= MAX_YEAR) {
        parsedYear = nYear;
      }
    }

    return { month: parsedMonth, year: parsedYear };
  };

  const setQuery = (month: number, year: number, shouldReplace = false): void => {
    const newQuery: string = `${PAGES.CALENDAR}?month=${month}&year=${year}`;
    shouldReplace ? history.replace(newQuery) : history.push(newQuery);
  };

  const { month, year }: NavigationQueries = getQuery(query.get('month'), query.get('year'));

  useEffect(() => {
    setQuery(month, year, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    month,
    year,
    setQuery
  };
};

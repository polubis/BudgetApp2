import moment from 'moment';

export const MONTH_SYMBOLS = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];

export const MONTH_NAMES = moment.months();

export const FIRST_MONTH = 1;

export const LAST_MONTH = 12;

export const MAX_YEAR = 2035;

export const MIN_YEAR = 2019;

export const DAYS_IN_WEEK_COUNT = 7;

export const AVAILABLE_YEARS = Array.from({ length: MAX_YEAR - MIN_YEAR + 1 }, (_, idx) => MIN_YEAR + idx);

export const toStringMonth = (month: number): string => {
  return month >= 10 ? '' + month : `0${month}`;
};

export const toStringDay = (day: number): string => {
  return day >= 10 ? '' + day : `0${day}`;
};

export const getTime = (date: moment.Moment): string => date.format('hh:mm');

export const getFirstDayOfMonth = (date: moment.Moment): number =>
  +moment(date)
    .startOf('month')
    .format('d');

export const getNumberOfDaysInMonth = (date: moment.Moment): number =>
  moment(date)
    .subtract(1, 'month')
    .daysInMonth();

import moment from 'moment';

export const toStringMonth = (month: number): string => {
  return month >= 10 ? '' + month : `0${month}`;
};

export const toStringDay = (day: number): string => {
  return day >= 10 ? '' + day : `0${day}`;
};

export const getFirstDayOfMonth = (date: moment.Moment): number =>
  +moment(date)
    .startOf('month')
    .format('d');

export const getNumberOfDaysInMonth = (date: moment.Moment): number =>
  moment(date)
    .subtract(1, 'month')
    .daysInMonth();

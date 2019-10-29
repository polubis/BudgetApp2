import moment from 'moment';

export const MONTH_SYMBOLS = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];

export const MONTH_NAMES = moment.months();

export const FIRST_MONTH = 1;

export const LAST_MONTH = 12;

export const MAX_YEAR = 2035;

export const MIN_YEAR = 2019;

export const DAYS_IN_WEEK_COUNT = 7;

export const AVAILABLE_YEARS = Array.from({ length: MAX_YEAR - MIN_YEAR + 1 }, (_, idx) => MIN_YEAR + idx);

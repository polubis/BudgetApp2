import { ExpenseEntity } from 'models/entities';

import expensesByDateMock from './expensesByDate.json';
import { ExpensesByDateEntity } from 'models/entities';

const expensesByDateMockData: ExpenseEntity[] = JSON.parse(JSON.stringify(expensesByDateMock));

export const expensesByYearMockResponse: ExpensesByDateEntity = expensesByDateMockData.reduce(
  (prev, curr) => {
    const newObject: ExpensesByDateEntity = { ...prev };
    newObject[curr.date] = prev.hasOwnProperty(curr.date) ? [...prev[curr.date]] : [curr];

    return newObject;
  },
  {} as ExpensesByDateEntity
);

export const expenseMock: ExpenseEntity = expensesByDateMockData[0];
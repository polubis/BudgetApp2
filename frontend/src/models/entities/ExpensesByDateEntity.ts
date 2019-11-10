import { ExpenseEntity } from '.';

export interface ExpensesByDateEntity {
  [key: string]: ExpenseEntity[];
}

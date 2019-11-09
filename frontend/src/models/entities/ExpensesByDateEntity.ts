import { ExpenseEntity } from "./ExpenseEntity";

export interface ExpensesByDateEntity {
  [key: string]: ExpenseEntity[];
}
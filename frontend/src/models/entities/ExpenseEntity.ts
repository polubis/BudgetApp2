import { BaseEntity } from './BaseEntity';

export interface ExpenseEntity extends BaseEntity {
  name: string;
  cost: number;
  date: string;
  description?: string;
}

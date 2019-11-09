import { ExpenseEntity } from 'models/entities';

export interface AddExpensePayload extends Omit<ExpenseEntity, 'id'> {}

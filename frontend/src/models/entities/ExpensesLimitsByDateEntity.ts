import { CurrencyEntity } from '.';

export interface ExpensesLimitsByDateEntity {
  [key: string]: { limit: number; currency: CurrencyEntity };
}

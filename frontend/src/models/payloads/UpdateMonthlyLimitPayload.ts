import { AvailableCurrencies } from 'models/others';

export interface UpdateMonthlyLimitPayload {
  month: number;
  year: number;
  limit: number;
  currency: AvailableCurrencies;
}

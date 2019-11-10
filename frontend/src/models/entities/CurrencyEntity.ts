import { AvailableCurrencies } from 'models/others';
import { BaseEntity } from './BaseEntity';

export interface CurrencyEntity extends BaseEntity {
  name: string;
  symbol: AvailableCurrencies;
}

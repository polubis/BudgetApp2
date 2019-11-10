import { CurrencyEntity } from 'models/entities';

export type AvailableCurrencies = '$' | 'zł';

// Replace if after with API CALL
export const CURRENCIES: Omit<CurrencyEntity, 'id'>[] = [{ symbol: 'zł', name: 'złoty' }, { symbol: '$', name: 'dolar' }];

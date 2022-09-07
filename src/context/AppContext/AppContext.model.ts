import { ReactNode } from 'react';

export interface CurrencyValueModel {
  origin: string;
  destiny: string;
  value: number;
}

export interface AppContextModel {
  currencies: string[];
  // getCurrencyValue({ origin, destiny, value }: CurrencyValueModel): any;
}

export interface AppProviderModel {
  children: ReactNode;
}

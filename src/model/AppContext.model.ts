import { ReactNode } from 'react';

export interface CurrencyValueModel {
  origin: string;
  destiny: string;
  value: number;
}

export interface AppContextModel {
  currencies: string[];
}

export interface AppProviderModel {
  children: ReactNode;
}

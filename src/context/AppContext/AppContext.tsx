import React, { createContext, useContext, useEffect, useState } from 'react';
import { api } from '~/services';
import { AppContextModel, AppProviderModel } from './AppContext.model';

const AppContext = createContext({} as AppContextModel);

const AppProvider: React.FC<AppProviderModel> = ({ children }) => {
  const [currencies, setCurrencies] = useState<string[]>([]);

  const getCurrencies = async () => {
    return await api.get('currencies.json').then((res) => setCurrencies(res.data));
  };

  useEffect(() => {
    getCurrencies();
  }, []);

  return <AppContext.Provider value={{ currencies }}>{children}</AppContext.Provider>;
};

const useApp = () => useContext(AppContext);

export { AppProvider, useApp };

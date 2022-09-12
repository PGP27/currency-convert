import { useEffect, useRef, useState } from 'react';
import { api } from './services';
import { Button, Input, Select } from './components';
import { SelectedCurrencyProps } from './models';
import './index.css';

const App = () => {
  const [loading, setLoading] = useState(false);
  const [currencies, setCurrencies] = useState([]);
  const [selectedCurrencies, setSelectedCurrencies] = useState<SelectedCurrencyProps>({
    from: {
      value: 'usd',
      label: 'United States dollar',
    },
    to: {
      value: 'brl',
      label: 'Brazilian real',
    },
  });

  const [convertedValue, setConvertedValue] = useState<number>();
  const currencyRef = useRef({ value: '1' } as { value: string });

  const getCurrencies = async () => {
    await api.get('currencies.json').then((res) => setCurrencies(res.data));
  };

  const switchCurrencies = () => {
    setSelectedCurrencies((old) => {
      return {
        from: old.to,
        to: old.from,
      };
    });
  };

  const convertCurrency = async () => {
    setLoading(true);
    const { from, to } = selectedCurrencies;
    await api
      .get(`currencies/${from.value}/${to.value}.json`)
      .then((res) =>
        setConvertedValue(res.data[`${to.value}`] * Number(currencyRef.current.value)),
      );
    setLoading(false);
  };

  useEffect(() => {
    getCurrencies();
    convertCurrency();
  }, []);

  return (
    <div className='h-screen w-screen flex items-center justify-center bg-gray-100'>
      <div className='flex flex-col items-center p-20 border border-gray-500 rounded-lg bg-white'>
        <h1 className='mb-12 text-3xl'>Currency Convert</h1>
        <div>
          <Select
            value={selectedCurrencies.from}
            options={Object.keys(currencies).map((cod, index) => ({
              value: cod,
              label: Object.values(currencies)[index],
            }))}
            onChange={(value) =>
              setSelectedCurrencies((old) => ({
                ...old,
                from: value,
              }))
            }
          />
          <Input
            onChange={({ target: { value } }) => (currencyRef.current.value = value)}
            defaultValue='1'
          />
        </div>
        <Button className='my-4' onClick={switchCurrencies}>
          Inverter
        </Button>
        <div>
          <Select
            value={selectedCurrencies.to}
            options={Object.keys(currencies).map((cod, index) => ({
              value: cod,
              label: Object.values(currencies)[index],
            }))}
            onChange={(value) =>
              setSelectedCurrencies((old) => ({
                ...old,
                to: value,
              }))
            }
          />
          <Input disabled value={convertedValue || ''} readOnly />
        </div>
        <Button className='flex items-center justify-center mt-4' onClick={convertCurrency}>
          {loading ? (
            <>
              <div className='h-4 w-4 mr-2 border-t-2 border-r-2 border-gray-700 rounded-full animate-spin' />
              <p>Carregando</p>
            </>
          ) : (
            'Converter'
          )}
        </Button>
      </div>
    </div>
  );
};

export default App;

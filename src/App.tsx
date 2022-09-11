import { useEffect, useRef, useState } from 'react';
import { api } from './services';
import { Input, Select } from './components';
import { SelectedCurrencyProps } from './models';
import './index.css';
import Button from './components/Button';

const App = () => {
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
  console.log(selectedCurrencies);

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
    const { from, to } = selectedCurrencies;
    await api
      .get(`currencies/${from.value}/${to.value}.json`)
      .then((res) =>
        setConvertedValue(res.data[`${to.value}`] * Number(currencyRef.current.value)),
      );
  };

  useEffect(() => {
    getCurrencies();
    convertCurrency();
  }, []);

  return (
    <div className='h-screen w-screen flex items-center justify-center'>
      <div className='flex items-center'>
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
        <Button onClick={switchCurrencies}>Inverter</Button>
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
      </div>
      <Button onClick={convertCurrency}>Converter</Button>
    </div>
  );
};

export default App;

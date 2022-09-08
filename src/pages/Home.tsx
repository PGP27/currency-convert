import { useEffect, useState } from 'react';
import { useApp } from '~/context/AppContext';
import Select from '~/components/Select';
import Input from '~/components/Input';
import { OptionModel } from '~/model/Option.model';
import { CurrencyValueModel } from '~/model/AppContext.model';
import { api } from '~/services';

const Home = () => {
  const { currencies } = useApp();

  const [selectedCurrencies, setSelectedCurrency] = useState<{
    first: OptionModel;
    second: OptionModel;
  }>({
    first: {
      value: 'usd',
      label: 'United States dollar',
    },
    second: {
      value: 'brl',
      label: 'Brazilian real',
    },
  });

  const [valueConverted, setValueConverted] = useState<number>();

  useEffect(() => {
    convertCurrency({
      origin: selectedCurrencies.first.value,
      destiny: selectedCurrencies.second.value,
      value: 1,
    });
  }, []);

  const convertCurrency = async ({ origin, destiny, value }: CurrencyValueModel) => {
    await api.get(`currencies/${origin}/${destiny}.json`).then((res) => {
      setValueConverted(res.data[`${destiny}`] * value);
    });
  };

  return (
    <div className='h-screen w-screen flex items-center justify-center'>
      <div className='flex items-center'>
        <div>
          <Select
            defaultValue={selectedCurrencies.first}
            options={Object.keys(currencies).map((cod, index) => ({
              value: cod,
              label: Object.values(currencies)[index],
            }))}
            onChange={(value) =>
              setSelectedCurrency((old) => ({
                ...old,
                first: value,
              }))
            }
          />
          <Input defaultValue={1} />
        </div>
        <div>
          <Select
            defaultValue={selectedCurrencies.second}
            options={Object.keys(currencies).map((cod, index) => ({
              value: cod,
              label: Object.values(currencies)[index],
            }))}
            onChange={(value) =>
              setSelectedCurrency((old) => ({
                ...old,
                second: value,
              }))
            }
          />
          <Input disabled value={valueConverted} />
        </div>
      </div>
    </div>
  );
};

export default Home;

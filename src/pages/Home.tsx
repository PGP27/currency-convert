import { useApp } from '~/context/AppContext/AppContext';
import Select from '~/components/Select/Select';
import Input from '~/components/Input/Input';
import { useState } from 'react';
import { OptionProps } from '~/components/Select/Select.model';

const Home = () => {
  const { currencies } = useApp();

  const [selectedCurrencies, setSelectedCurrency] = useState<{
    first: OptionProps;
    second: OptionProps;
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
          <Input />
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
          <Input />
        </div>
      </div>
    </div>
  );
};

export default Home;

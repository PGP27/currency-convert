import React, { useEffect, useRef, useState } from 'react';
import { CaretDown, CaretUp } from 'phosphor-react';
import { OptionModel } from '~/model/Option.model';
import { SelectModel } from '~/model/Select.model';

const Select: React.FC<SelectModel> = ({ defaultValue, options, onChange }) => {
  const [currentOption, setCurrentOption] = useState<OptionModel>(defaultValue);
  const [optionsIsVisible, setOptionsIsVisible] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = ({ target }: any) => {
      if (ref.current && !ref.current.contains(target)) {
        setOptionsIsVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  useEffect(() => {
    onChange(currentOption);
  }, [currentOption]);

  return (
    <div ref={ref} className='w-full relative'>
      <button
        className={`w-full relative flex items-center transition rounded border border-gray-300 ${
          optionsIsVisible ? 'bg-white border-gray-500' : 'bg-gray-200'
        }`}
        onClick={() => setOptionsIsVisible((old) => !old)}
      >
        <p className='p-2 text-lg'>{currentOption.label}</p>
        {optionsIsVisible ? (
          <CaretUp weight='bold' className='absolute text-lg right-3' />
        ) : (
          <CaretDown weight='bold' className='absolute text-lg right-3' />
        )}
      </button>
      {optionsIsVisible && (
        <div className='absolute w-full flex flex-col items-start bg-white rounded border-2 border-gray-300 max-h-80 overflow-y-auto'>
          {options.map((option) => (
            <button
              key={option.value}
              className='w-full text-lg text-left py-1 px-2 hover:bg-blue-100'
              onClick={() => {
                setCurrentOption(option);
                setOptionsIsVisible(false);
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;

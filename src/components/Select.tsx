import React, { useEffect, useRef, useState } from 'react';
import { CaretDown } from 'phosphor-react';
import { OptionProps, SelectModel } from '../models/Select.model';

const Select: React.FC<SelectModel> = ({ value, options, onChange }) => {
  const [currentOption, setCurrentOption] = useState<OptionProps>(value);
  const [optionsIsVisible, setOptionsIsVisible] = useState(false);

  console.log(currentOption);

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
          optionsIsVisible ? 'bg-white border-gray-500' : 'bg-gray-100'
        }`}
        onClick={() => setOptionsIsVisible((old) => !old)}
      >
        <p className='p-2 text-lg'>{value.label || currentOption.label}</p>
        <CaretDown
          weight='bold'
          className={`absolute text-lg right-3 transition ${optionsIsVisible ? '-rotate-180' : ''}`}
        />
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

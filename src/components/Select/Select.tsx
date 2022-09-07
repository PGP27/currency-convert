import { CaretDown, CaretUp } from 'phosphor-react';
import React, { useEffect, useRef, useState } from 'react';
import { SelectModel } from './Select.model';

const Select: React.FC<SelectModel> = ({ defaultValue, options }) => {
  const [currentOption, setCurrentOption] = useState(defaultValue);
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

  return (
    <div ref={ref} className='w-full relative'>
      <button
        className='w-full relative flex items-center rounded bg-gray-200'
        onClick={() => setOptionsIsVisible((old) => !old)}
      >
        <p className='p-2 text-lg'>{currentOption}</p>
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
              key={option}
              className='w-full text-lg text-left py-1 px-2 hover:bg-gray-300'
              onClick={() => {
                setCurrentOption(option);
                setOptionsIsVisible(false);
              }}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;

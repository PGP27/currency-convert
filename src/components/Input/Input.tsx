import React from 'react';
import { InputModel } from './Input.model';

const Input: React.FC<InputModel> = ({ ...rest }) => {
  return (
    <input
      {...rest}
      type='number'
      autoComplete='on'
      className='w-full outline-none py-2 px-4 transition rounded border border-gray-300 bg-gray-200 focus:bg-gray-50 focus:border-gray-500 appearance-none'
    />
  );
};

export default Input;

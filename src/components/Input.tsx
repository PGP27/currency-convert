import React from 'react';
import { InputModel } from '~/models';

const Input: React.FC<InputModel> = ({ ...rest }) => {
  return (
    <input
      {...rest}
      type='number'
      autoComplete='on'
      className='w-full outline-none py-2 px-4 transition rounded border border-gray-300 bg-gray-100 focus:bg-gray-50 focus:border-gray-500 appearance-none'
    />
  );
};

export default Input;

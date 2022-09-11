import React from 'react';
import { ButtonModel } from '~/models/Button.model';

const Button: React.FC<ButtonModel> = ({ className, children, ...rest }) => {
  return (
    <button
      {...rest}
      className={`w-fit rounded p-2 transition text-green-600 font-medium hover:text-green-700 hover:bg-gray-100 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;

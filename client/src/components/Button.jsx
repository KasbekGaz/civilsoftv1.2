import React from 'react';

const Button = ({ color, text }) => {
  const getButtonStyle = () => {
    switch (color) {
      case 'green':
        return 'bg-lime-600 hover:bg-lime-700 text-white font-bold py-2 px-4 rounded';
      case 'orange':
        return 'bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded';
      case 'red':
        return 'bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded';
    case 'yellow':
        return 'bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded';
    case 'gold':
      return 'bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded';
      default:
        return '';
    }
  };

  return (
    <div className='grid-cols-1'>
      <button className={getButtonStyle()}>{text}</button>
    </div>
  );
};

export default Button;
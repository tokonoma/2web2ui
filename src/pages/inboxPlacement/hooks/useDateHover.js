import { useState } from 'react';

const useDateHover = (initialDate = '') => {
  const [hoveredDate, setHoveredDate] = useState(initialDate);

  const handleDateHover = ({ payload = {}}) => {
    const { date } = payload;
    setHoveredDate(date);
  };

  const resetDateHover = () => {
    setHoveredDate('');
  };

  return [hoveredDate, handleDateHover, resetDateHover];
};

export default useDateHover;


import { useState } from 'react';

const useDateHover = (initialDate = '') => {
  const [hoveredDate, setHoveredDate] = useState(initialDate);

  const handleDateHover = (node) => {
    const { payload: { date, totalMessages } = {}} = node;
    //Do not set hovered if no data exists
    if (totalMessages) {
      setHoveredDate(date);
    } else {
      setHoveredDate('');
    }
  };

  const resetDateHover = () => {
    setHoveredDate('');
  };

  return [hoveredDate, handleDateHover, resetDateHover];
};

export default useDateHover;


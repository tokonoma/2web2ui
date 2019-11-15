import { useState } from 'react';
import _ from 'lodash';

const useDateHover = (initialDate = '') => {
  const [hoveredDate, setHoveredDate] = useState(initialDate);

  const handleDateHover = (node) => {
    //Do not set hovered if no data exists
    if (node.value.some((value) => value !== 0)) {
      setHoveredDate(_.get(node, 'payload.date'));
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


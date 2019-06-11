import { useState } from 'react';
import { getRelativeDates } from 'src/helpers/date';

const useDatePicker = () => {
  const [dateRange, setDateRange] = useState({ ...getRelativeDates('hour') });
  const updateDateRange = ({ relativeRange, from = null, to = null }) => {
    const fullDateRange =
      relativeRange !== 'custom' ? getRelativeDates(relativeRange) : { relativeRange, from, to };
    setDateRange(fullDateRange);
  };
  return { dateRange, setDateRange: updateDateRange };
};

export default useDatePicker;

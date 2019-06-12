import { useState } from 'react';
import { getRelativeDates } from 'src/helpers/date';
import moment from 'moment';

const parseDate = (date) => {
  if (date instanceof Date) {
    return date;
  }
  return moment(date).toDate();
};

const toDateRange = ({ relativeRange, from, to }) => relativeRange === 'custom'
  ? { relativeRange, from: parseDate(from), to: parseDate(to) }
  : getRelativeDates(relativeRange);

const useDatePicker = (initialDateRange) => {
  const [dateRange, setDateRange] = useState(toDateRange(initialDateRange));

  const updateDateRange = ({ relativeRange, from, to }) => {
    const fullDateRange = toDateRange({ relativeRange, from, to });
    setDateRange(fullDateRange);
  };
  return { dateRange, setDateRange: updateDateRange };
};

export default useDatePicker;

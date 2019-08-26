import React from 'react';
import { formatFullNumber } from 'src/helpers/units';

const JobAddressCount = ({ count, status }) => {
  if (status !== 'success') {
    return null;
  }

  return (
    <span>
      {formatFullNumber(count)}
    </span>
  );
};

export default JobAddressCount;

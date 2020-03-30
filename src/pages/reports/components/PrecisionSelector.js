import React, { useEffect } from 'react';

import { getPrecisionOptions, roundBoundaries } from 'src/helpers/metrics';
import { Select } from 'src/components/matchbox';
import moment from 'moment';

const PrecisionSelector = ({ from, to, changeTime, selectedPrecision }) => {
  const precisionOptions = getPrecisionOptions(moment(from), moment(to));

  useEffect(() => {
    const precisionOptionsValues = precisionOptions.map(({ value }) => value);
    if (!precisionOptionsValues.includes(selectedPrecision)) {
      changeTime({ precision: precisionOptionsValues[0] });
    }
  }, [changeTime, from, precisionOptions, selectedPrecision, to]);

  const updatePrecision = ({ currentTarget: { value: precision } }) => {
    const { from: roundedFrom, to: roundedTo } = roundBoundaries({ from, to, precision });

    changeTime({ from: roundedFrom.toDate(), to: roundedTo.toDate(), precision });
  };

  return <Select options={precisionOptions} onChange={updatePrecision} value={selectedPrecision} />;
};

export default PrecisionSelector;

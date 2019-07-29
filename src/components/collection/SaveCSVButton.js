import { Button } from '@sparkpost/matchbox';
import React from 'react';
import { formatToCsv } from 'src/helpers/downloading';

const SaveCSVButton = ({ data, saveCsv, caption = 'Save As CSV', ...props }) => {
  const now = Math.floor(Date.now() / 1000);

  if (!saveCsv || !data) {
    return null;
  }

  return <Button download={`sparkpost-csv-${now}.csv`} to={formatToCsv({ data, returnBlob: false })} {...props}>{caption}</Button>;
};

export default SaveCSVButton;

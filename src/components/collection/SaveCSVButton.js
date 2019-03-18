import { Button } from '@sparkpost/matchbox';
import React from 'react';
import { formatToCsv } from 'src/helpers/downloading.js';

const SaveCSVButton = ({ data, saveCsv }) => {
  const now = Math.floor(Date.now() / 1000);

  if (!saveCsv || !data) {
    return null;
  }

  return <Button download={`sparkpost-csv-${now}.csv`} to={formatToCsv({ data, returnBlob: false })}>Save As CSV</Button>;
};

export default SaveCSVButton;

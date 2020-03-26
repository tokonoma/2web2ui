import { Button } from 'src/components/matchbox';
import React from 'react';
import { DownloadLink } from 'src/components/links';
import { formatToCsv } from 'src/helpers/downloading';

const SaveCSVButton = ({ data, saveCsv, caption = 'Save As CSV', filename, ...props }) => {
  const now = Math.floor(Date.now() / 1000);
  const download = filename ? filename : `sparkpost-csv-${now}.csv`;

  if (!saveCsv || !data) {
    return null;
  }

  return (
    <DownloadLink
      as={Button}
      download={download}
      to={formatToCsv({ data, returnBlob: false })}
      {...props}
    >
      {caption}
    </DownloadLink>
  );
};

export default SaveCSVButton;

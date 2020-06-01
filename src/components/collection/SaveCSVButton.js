import { Button } from 'src/components/matchbox';
import React from 'react';
import { useHibana } from 'src/context/HibanaContext';
import { DownloadLink } from 'src/components/links';
import { formatToCsv } from 'src/helpers/downloading';

const SaveCSVButton = ({ data, saveCsv, caption = 'Save As CSV', filename, ...props }) => {
  const [state] = useHibana();
  const { isHibanaEnabled } = state;
  const now = Math.floor(Date.now() / 1000);
  const download = filename ? filename : `sparkpost-csv-${now}.csv`;
  let buttonStyleProps;

  if (isHibanaEnabled) {
    buttonStyleProps = {
      variant: 'monochrome-secondary',
    };
  }

  if (!saveCsv || !data) {
    return null;
  }

  return (
    <DownloadLink
      {...buttonStyleProps}
      as={Button}
      download={download}
      href={formatToCsv({ data, returnBlob: false })}
      {...props}
    >
      {caption}
    </DownloadLink>
  );
};

export default SaveCSVButton;

import React from 'react';
import { Button, Inline } from 'src/components/matchbox';
import { FileDownload } from '@sparkpost/matchbox-icons';

export const downloadCodes = codes => {
  const codesb64 = btoa(codes.join('\n'));
  return `data:text/plain;base64,${codesb64}`;
};

const DownloadCodes = ({ codes }) => (
  <Button variant="secondary" download={'sparkpost-backup-codes.txt'} to={downloadCodes(codes)}>
    <Inline space="100">
      <FileDownload size={14} />
      Download
    </Inline>
  </Button>
);

export default DownloadCodes;

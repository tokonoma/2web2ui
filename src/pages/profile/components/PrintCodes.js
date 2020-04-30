import React from 'react';
import { Button } from 'src/components/matchbox';
import print from 'print-js';

export const printCodes = codes => {
  const formattedCodes = codes.map(code => ({ code }));
  print({ printable: formattedCodes, properties: ['code'], type: 'json' });
};

const PrintCodes = ({ codes }) => (
  <Button variant="secondary" onClick={() => printCodes(codes)}>
    Print
  </Button>
);

export default PrintCodes;

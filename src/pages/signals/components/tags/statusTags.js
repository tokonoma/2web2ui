import React from 'react';
import { Tag } from 'src/components/matchbox';

const friendlyErrorTypeMap = {
  validation: 'Validation error',
  system: 'System error',
  decompress: 'Decompression error',
  duplicate_batch: 'Duplicate batch',
  empty_batch: 'Empty batch',
};
const Status = ({ status, error }) => {
  const isError = status !== 'success';
  const msg = isError ? friendlyErrorTypeMap[error] : 'Success';
  const color = isError ? 'red' : 'green';

  return <Tag color={color}>{msg}</Tag>;
};

export default Status;

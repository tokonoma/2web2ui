import React from 'react';
import { Box } from 'src/components/matchbox';
import { DomainStatusTag } from 'src/components/tags';
import { VerifiedIcon } from './Icons';

const StatusLabel = ({ status }) => {
  if (status === 'verified') {
    return (
      <Box display="flex" alignItems="center">
        <VerifiedIcon /> <strong>Verified</strong>
      </Box>
    );
  }

  return <DomainStatusTag status={status} />;
};

export default StatusLabel;

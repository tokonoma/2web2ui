import React from 'react';
import { DomainStatusTag } from 'src/components/tags';
import { VerifiedIcon } from './Icons';

const StatusLabel = ({ status }) => {
  if (status === 'verified') {
    return <div><VerifiedIcon/> <strong>Verified</strong></div>;
  }

  return <DomainStatusTag status={status} />;
};

export default StatusLabel;

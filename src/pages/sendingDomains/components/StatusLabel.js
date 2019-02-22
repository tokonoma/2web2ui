import React from 'react';
import { DomainStatusTag } from 'src/components/tags';
import { AutoVerifiedIcon, VerifiedIcon } from './Icons';

const StatusLabel = ({ isAutoVerified = false, status }) => {
  if (isAutoVerified) {
    return <div><AutoVerifiedIcon/> <strong>Auto Verified</strong></div>;
  }

  if (status === 'verified') {
    return <div><VerifiedIcon/> <strong>Verified</strong></div>;
  }

  return <DomainStatusTag status={status} />;
};

export default StatusLabel;

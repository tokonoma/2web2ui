import React from 'react';
import { ContentCopy } from '@sparkpost/matchbox-icons';
import { UnstyledLink } from 'src/components/matchbox';

const DuplicateTemplate = props => {
  const { className, onClick } = props;

  return (
    <div className={className}>
      <UnstyledLink
        onClick={onClick}
        role="button"
        to="javascript:void(0);"
        data-id="action-duplicate"
      >
        <ContentCopy />

        <span>Duplicate</span>
      </UnstyledLink>
    </div>
  );
};

export default DuplicateTemplate;

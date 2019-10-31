import React from 'react';
import { UnstyledLink } from '@sparkpost/matchbox';
import { ContentCopy } from '@sparkpost/matchbox-icons';

const DuplicateTemplate = (props) => {
  const { className, onClick } = props;

  return (
    <div className={className}>
      <UnstyledLink
        onClick={onClick}
        role="button"
        to="javascript:void(0);"
        data-id="action-duplicate"
      >
        <ContentCopy/>

        <span>Duplicate</span>
      </UnstyledLink>
    </div>
  );
};

export default DuplicateTemplate;

import React from 'react';
import { UnstyledLink } from '@sparkpost/matchbox';
import { Delete } from '@sparkpost/matchbox-icons';

const DeleteTemplate = (props) => {
  const { className, onClick } = props;

  return (
    <div className={className}>
      <UnstyledLink
        onClick={onClick}
        role="button"
        to="javascript:void(0);"
      >
        <Delete/>

        <span>Delete</span>
      </UnstyledLink>
    </div>
  );
};

export default DeleteTemplate;

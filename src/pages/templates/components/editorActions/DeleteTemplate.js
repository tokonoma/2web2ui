import React from 'react';
import PropTypes from 'prop-types';
import { Delete } from '@sparkpost/matchbox-icons';
import { UnstyledLink } from 'src/components/matchbox';

const DeleteTemplate = props => {
  const { className, onClick } = props;

  return (
    <div className={className}>
      <UnstyledLink
        onClick={onClick}
        role="button"
        to="javascript:void(0);"
        data-id="action-delete"
      >
        <Delete />

        <span>Delete</span>
      </UnstyledLink>
    </div>
  );
};

DeleteTemplate.propTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default DeleteTemplate;

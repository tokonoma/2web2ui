import React from 'react';
import PropTypes from 'prop-types';
import { UnstyledLink } from 'src/components/matchbox';

export default function ButtonLink(props) {
  const handleClick = e => {
    e.preventDefault();

    if (props.onClick) props.onClick();
  };

  return <UnstyledLink {...props} to="#" role="button" onClick={handleClick} />;
}

ButtonLink.propTypes = {
  onClick: PropTypes.func.isRequired,
};

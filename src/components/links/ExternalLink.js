import React from 'react';
import PropTypes from 'prop-types';
import { OpenInNew } from '@sparkpost/matchbox-icons';
import { Button, UnstyledLink } from 'src/components/matchbox';

let asButtonStyles = {
  textDecoration: 'underline',
};

const ExternalLink = ({
  as: Component = UnstyledLink,
  children,
  component: _component, // ignore, won't apply external props correctly if set
  ...props
}) => {
  const isButton = Component.name === 'Button';
  let iconSize = 13;
  let iconMargin = '-0.1em 0 0 0';

  if (isButton) {
    iconSize = 18;
    iconMargin = '0 0 0 4px';
  }

  return (
    <Component style={isButton ? asButtonStyles : {}} {...props} external={true}>
      {children} <OpenInNew size={iconSize} style={{ margin: iconMargin }} />
    </Component>
  );
};

ExternalLink.propTypes = {
  as: PropTypes.oneOf([Button, UnstyledLink]),
  children: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired,
};

export default ExternalLink;

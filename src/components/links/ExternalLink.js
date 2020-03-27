import React from 'react';
import PropTypes from 'prop-types';
import { OpenInNew } from '@sparkpost/matchbox-icons';
import { Button, UnstyledLink } from 'src/components/matchbox';

const ExternalLink = ({
  as: Component = UnstyledLink,
  children,
  component: _component, // ignore, won't apply external props correctly if set
  onClick: _onClick, // ignore
  ...props
}) => (
  <Component {...props} external={true}>
    {children} <OpenInNew size={13} style={{ marginTop: '-0.1em' }} />
  </Component>
);

ExternalLink.propTypes = {
  as: PropTypes.oneOf([Button, UnstyledLink]),
  children: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired,
};

export default ExternalLink;

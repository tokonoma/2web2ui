import React from 'react';
import PropTypes from 'prop-types';
import { OpenInNew } from '@sparkpost/matchbox-icons';
import { UnstyledLink } from 'src/components/matchbox';

const ExternalLink = ({
  children,
  component: _component, // ignore, won't apply external props correctly if set
  onClick: _onClick, // ignore
  ...props
}) => (
  <UnstyledLink {...props} external>
    {children} <OpenInNew size={13} style={{ marginTop: '-0.1em' }} />
  </UnstyledLink>
);

ExternalLink.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired,
};

export default ExternalLink;

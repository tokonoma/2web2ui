import React from 'react';
import PropTypes from 'prop-types';
import { OpenInNew } from '@sparkpost/matchbox-icons';
import { UnstyledLink } from 'src/components/matchbox';

export default function ExternalLink({ children, component, ...props }) {
  return (
    <UnstyledLink {...props} external>
      {children} <OpenInNew size={13} style={{ marginTop: '-0.1em' }} />
    </UnstyledLink>
  );
}

ExternalLink.propTypes = {
  href: PropTypes.string.isRequired,
};

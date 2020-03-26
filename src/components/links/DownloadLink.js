import React from 'react';
import PropTypes from 'prop-types';
import { Button, UnstyledLink } from 'src/components/matchbox';

// Link to download a static file
// SEE: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-download
const DownloadLink = ({ as: Component = UnstyledLink, children, ...props }) => (
  <Component {...props} download referrerPolicy="origin">
    {children}
  </Component>
);

DownloadLink.propTypes = {
  as: PropTypes.oneOf([Button, UnstyledLink]),
  children: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired,
};

export default DownloadLink;

import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { UnstyledLink } from 'src/components/matchbox';

// Link to a page in our application
const PageLink = ({ children, ...props }) => (
  <UnstyledLink {...props} component={Link}>
    {children}
  </UnstyledLink>
);

PageLink.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.oneOfType([
    PropTypes.string,
    // see, https://reacttraining.com/react-router/web/api/Link/to-object
    PropTypes.shape({
      pathname: PropTypes.string.isRequired,
      search: PropTypes.string,
      hash: PropTypes.string,
      state: PropTypes.object,
    }),
  ]).isRequired,
};

export default PageLink;

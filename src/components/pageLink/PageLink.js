import React from 'react';
import { Link } from 'react-router-dom';
import { UnstyledLink } from 'src/components/matchbox';

// Link to a page in our application
export default function PageLink({ children, ...props }) {
  return (
    <UnstyledLink component={Link} {...props}>
      {children}
    </UnstyledLink>
  );
}

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { openSupportTicketForm } from 'src/actions/support';
import { UnstyledLink } from 'src/components/matchbox';

// todo, disconnect from redux and use context
export const SupportTicketLink = ({
  children,
  issueId, // see, src/config/supportIssues for a complete list
  message,
  openSupportTicketForm = () => {},
  to: _to, // ignore
  ...props
}) => (
  <UnstyledLink
    {...props}
    href="javascript:void(0);"
    onClick={() => openSupportTicketForm({ issueId, message })}
    role="button"
  >
    {children}
  </UnstyledLink>
);

SupportTicketLink.propTypes = {
  children: PropTypes.node.isRequired,
  issueId: PropTypes.string.isRequired,
  message: PropTypes.string,
};

export default connect(undefined, { openSupportTicketForm })(SupportTicketLink);

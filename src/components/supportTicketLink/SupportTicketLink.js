import React from 'react';
import { connect } from 'react-redux';
import { openSupportTicketForm } from 'src/actions/support';
import { UnstyledLink } from 'src/components/matchbox';

export function SupportTicketLink({ children, openSupportTicketForm, ...ticketOptions }) {
  return (
    <UnstyledLink onClick={() => openSupportTicketForm(ticketOptions)}>{children}</UnstyledLink>
  );
}

export default connect(undefined, { openSupportTicketForm })(SupportTicketLink);

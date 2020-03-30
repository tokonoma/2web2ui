import React from 'react';
import { Redirect } from 'react-router-dom';
import { UnstyledLink } from 'src/components/matchbox';
import DeleteSnippetModal from './DeleteSnippetModal.container';

const DeleteSnippetLink = ({ id, subaccountId, to: ignoreMe, ...rest }) => (
  <DeleteSnippetModal>
    {({ open, wasDeleted }) =>
      wasDeleted ? (
        <Redirect push={true} to="/snippets" />
      ) : (
        <UnstyledLink {...rest} onClick={() => open({ id, subaccountId })} />
      )
    }
  </DeleteSnippetModal>
);

export default DeleteSnippetLink;

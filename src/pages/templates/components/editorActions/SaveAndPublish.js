import React from 'react';
import { CheckCircleOutline } from '@sparkpost/matchbox-icons';
import { Button, UnstyledLink } from 'src/components/matchbox';

const SaveAndPublish = props => {
  const { onClick, className, children } = props;

  return (
    <div className={className}>
      {children && (
        <Button
          variant="secondary"
          onClick={onClick}
          title="Opens a dialog"
          data-id="action-save-and-publish"
        >
          {children}
        </Button>
      )}

      {!children && (
        <UnstyledLink
          onClick={onClick}
          role="button"
          to="javascript:void(0);"
          title="Opens a dialog"
          data-id="action-save-and-publish"
        >
          <CheckCircleOutline />

          <span>Save and Publish</span>
        </UnstyledLink>
      )}
    </div>
  );
};

export default SaveAndPublish;

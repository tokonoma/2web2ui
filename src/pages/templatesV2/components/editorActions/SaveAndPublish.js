import React from 'react';
import { UnstyledLink, Button } from '@sparkpost/matchbox';
import { CheckCircleOutline } from '@sparkpost/matchbox-icons';

const SaveAndPublish = (props) => {
  const {
    onClick,
    className,
    children
  } = props;

  return (
    <div className={className}>
      {children &&
        <Button onClick={onClick} title="Opens a dialog">
          {children}
        </Button>
      }

      {!children &&
        <UnstyledLink
          onClick={onClick}
          role="button"
          to="javascript:void(0);"
          title="Opens a dialog"
        >
          <CheckCircleOutline/>

          <span>Save and Publish</span>
        </UnstyledLink>
      }
    </div>
  );
};

export default SaveAndPublish;

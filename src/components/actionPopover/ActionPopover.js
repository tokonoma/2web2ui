import React from 'react';
import PropTypes from 'prop-types';
import { MoreHoriz } from '@sparkpost/matchbox-icons';
import { ActionList, Button, Popover } from 'src/components/matchbox';

const ActionPopover = ({ actions, id }) => (
  <div style={{ textAlign: 'right' }}>
    <Popover
      id={id}
      left
      trigger={
        <Button aria-describedby={id} flat>
          <MoreHoriz size={20} />
        </Button>
      }
    >
      <ActionList actions={actions} />
    </Popover>
  </div>
);

ActionPopover.propTypes = {
  actions: PropTypes.array,
  id: PropTypes.string.isRequired,
};

export default ActionPopover;

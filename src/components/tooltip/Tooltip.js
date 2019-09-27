import React, { useState } from 'react';
import { Popover } from '@sparkpost/matchbox';
import style from './Tooltip.module.scss';

// note, Matchbox's Tooltip has static dimensions that prevent us from doing fun things
// todo, should use Matchbox's Tooltip
const Tooltip = ({ children, content, initialOpen = false }) => {
  const [isOpen, setOpen] = useState(initialOpen);

  return (
    <Popover
      children={content}
      className={style.Content}
      open={isOpen}
      sectioned={false}
      trigger={
        <span
          onMouseEnter={() => { setOpen(true); }}
          onMouseLeave={() => { setOpen(false); }}
        >
          {children}
        </span>
      }
    />
  );
};

export default Tooltip;

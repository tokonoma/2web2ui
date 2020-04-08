import React, { useState } from 'react';
import { Popover } from 'src/components/matchbox';
import useUniqueId from 'src/hooks/useUniqueId';
import style from './Tooltip.module.scss';

// note, Matchbox's Tooltip has static dimensions that prevent us from doing fun things
// todo, should use Matchbox's Tooltip
const Tooltip = ({ children, content, initialOpen = false }) => {
  const [isOpen, setOpen] = useState(initialOpen);
  const uniqueId = useUniqueId('tooltip-');

  return (
    <Popover
      id={uniqueId}
      children={content}
      className={style.Content}
      open={isOpen}
      sectioned={false}
      trigger={
        <span
          aria-controls={uniqueId}
          onMouseEnter={() => {
            setOpen(true);
          }}
          onMouseLeave={() => {
            setOpen(false);
          }}
        >
          {children}
        </span>
      }
    />
  );
};

export default Tooltip;

import React from 'react';
import Draggable from 'react-draggable';

export const DraggableModal = ({ open, handleToggle, children }) => {
  return (
    <Draggable enableUserSelectHack={false}>
      {open ? (
        <div
          style={{
            position: 'fixed',
            background: 'white',
            minHeight: '900px',
            width: '500px',
            zIndex: 999,
            padding: '10px',
            boxShadow: '0 1px 6px 0 rgba(32, 33, 36, .28)',
            borderRadius: '2px',
            overflowY: 'scroll',
          }}
        >
          <button
            style={{ position: 'absolute', color: 'black', top: '0px', right: '0px' }}
            onClick={handleToggle}
          >
            {' '}
            X{' '}
          </button>
          {children}
        </div>
      ) : (
        <div />
      )}
    </Draggable>
  );
};

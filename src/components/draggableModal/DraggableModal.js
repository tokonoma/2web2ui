import React from 'react';
import Draggable from 'react-draggable';

export const DraggableModal = ({ open, handleToggle }) => {
  return (
    <Draggable>
      {open ? (
        <div
          style={{
            position: 'fixed',
            background: 'white',
            height: '500px',
            width: '500px',
            zIndex: 999,
            padding: '10px',
            boxShadow: '0 1px 6px 0 rgba(32, 33, 36, .28)',
            borderRadius: '2px',
          }}
        >
          <button
            style={{ position: 'absolute', color: 'black', top: '-10px', right: '-10px' }}
            onClick={handleToggle}
          >
            {' '}
            X{' '}
          </button>
        </div>
      ) : (
        <div />
      )}
    </Draggable>
  );
};

import React from 'react';
import Draggable from 'react-draggable';

export const DraggableModal = ({ open, handleToggle, children }) => {
  return (
    <Draggable enableUserSelectHack={false} handle=".handle">
      {open ? (
        <div
          style={{
            position: 'fixed',
            background: 'white',
            minHeight: '900px',
            width: '700px',
            zIndex: 999,
            padding: '10px',
            boxShadow: '0 1px 6px 0 rgba(32, 33, 36, .28)',
            borderRadius: '2px',
            overflowY: 'scroll',
          }}
        >
          <div
            className="handle"
            style={{ height: 30, backgroundColor: 'gray', position: 'relative' }}
          >
            <button
              style={{ position: 'absolute', color: 'black', top: '0px', right: '0px' }}
              onClick={handleToggle}
            >
              {' '}
              X{' '}
            </button>
          </div>
          {children}
        </div>
      ) : (
        <div />
      )}
    </Draggable>
  );
};

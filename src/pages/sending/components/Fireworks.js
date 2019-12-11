import React from 'react';
import Explosion1 from 'react-explode/Explosion1';
import Explosion3 from 'react-explode/Explosion3';
import Explosion4 from 'react-explode/Explosion4';
import Explosion7 from 'react-explode/Explosion7';

const Fireworks = props => {
  const { size, repetitions } = props;
  const sizeNum = parseInt(size, 10);

  return (
    <div
      style={{
        position: 'fixed',
        width: '100vw',
        height: '100vh',
        top: 0,
        left: 0,
        zIndex: 9999,
        pointerEvents: 'none',
      }}
    >
      <Explosion1
        size={size}
        delay={0.5}
        repeatDelay={0.125}
        repeat={repetitions}
        color="#FA6423"
      />
      <Explosion4
        size={(sizeNum / 1.5).toString()}
        delay={1}
        repeatDelay={0.1}
        repeat={repetitions}
        color="#FA6423"
      />
      <Explosion3
        size={size * 0.75}
        delay={0}
        repeatDelay={0.075}
        repeat={repetitions}
        color="#FA6423"
      />
      <Explosion7
        size={(sizeNum * 1.5).toString()}
        delay={0}
        repeatDelay={0.1}
        repeat={repetitions}
        color="#FA6423"
      />
    </div>
  );
};

export default Fireworks;

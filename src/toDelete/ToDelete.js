import React from 'react';

const ToDelete = ({ a, b }) => {
  let x = 1;

  if (b === 3) {
    x *= 2;
  } else if (b === 1) {
    x *= 4;
  }

  switch (a) {
    case 5:
      return <span>{`Hello ${x}`}</span>;
    case 6:
      return <span>{`Goodbye ${x}`}</span>;
    case 7:
      return <span>{`Okay ${x}`}</span>;
    default:
      return null;
  }
};

export default ToDelete;

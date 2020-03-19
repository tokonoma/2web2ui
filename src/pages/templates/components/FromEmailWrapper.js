import React from 'react';
import FromEmail from './FromEmail';

const FromEmailWrapper = ({ input, meta, ...rest }) => {
  const { active, error, touched } = meta;

  return (
    <FromEmail
      id={input.name}
      {...input}
      error={!active && touched && error ? error : undefined}
      {...rest}
    />
  );
};

export default FromEmailWrapper;

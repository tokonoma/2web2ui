import React from 'react';
import MultiFacet from './MultiFacet';

const MultiFacetWrapper = ({ input, meta, ...rest }) => {
  const { active, error, touched } = meta;

  return (
    <MultiFacet
      {...input}
      error={!active && touched && error ? error : undefined}
      {...rest}
    />
  );
};

export default MultiFacetWrapper;

import React from 'react';
import { useHibana } from 'src/context/HibanaContext';

const toggleHibana = (OGComponent, HibanaComponent) => props => {
  const [{ isHibanaEnabled }] = useHibana();
  return isHibanaEnabled ? <HibanaComponent {...props} /> : <OGComponent {...props} />;
};

export default toggleHibana;

import React from 'react';
import { useHibana } from 'src/context/HibanaContext';

export default function useHibanaToggle(OGComponent, HibanaComponent) {
  const [state] = useHibana();
  const { isHibanaEnabled } = state;
  return props => (isHibanaEnabled ? <HibanaComponent {...props} /> : <OGComponent {...props} />);
}

import React from 'react';
import CreatePage from './CreatePage';
import CreatePageHibana from './CreatePageHibana';
import { useHibana } from 'src/context/HibanaContext';
export default function AbTestCreateFormContainer(props) {
  const [state] = useHibana();
  const { isHibanaEnabled = false } = state;
  return isHibanaEnabled ? <CreatePageHibana {...props} /> : <CreatePage {...props} />;
}

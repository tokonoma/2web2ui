import React from 'react';
import AbTestCreateForm from './AbTestCreateForm';
import AbTestCreateFormHibana from './AbTestCreateFormHibana';
import { useHibana } from 'src/context/HibanaContext';
export default function AbTestCreateFormContainer(props) {
  const [state] = useHibana();
  const { isHibanaEnabled = false } = state;
  return isHibanaEnabled ? <AbTestCreateFormHibana {...props} /> : <AbTestCreateForm {...props} />;
}

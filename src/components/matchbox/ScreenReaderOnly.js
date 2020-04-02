import React from 'react';
import { ScreenReaderOnly as OGScreenReaderOnly } from '@sparkpost/matchbox';
import { ScreenReaderOnly as HibanaScreenReaderOnly } from '@sparkpost/matchbox-hibana';
import { useHibana } from 'src/context/HibanaContext';

HibanaScreenReaderOnly.displayName = 'HibanaScreenReaderOnly';

export default function ScreenReaderOnly(props) {
  const [state] = useHibana();
  const { isHibanaEnabled } = state;

  if (!isHibanaEnabled) {
    return <OGScreenReaderOnly {...props} />;
  }

  return <HibanaScreenReaderOnly {...props} />;
}

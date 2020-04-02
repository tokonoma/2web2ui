import React from 'react';
import { ThemeProvider as HibanaThemeProvider } from '@sparkpost/matchbox-hibana';
import { useHibana } from 'src/context/HibanaContext';

export default function ThemeProvider(props) {
  const [state] = useHibana();
  const { isHibanaEnabled } = state;

  return !isHibanaEnabled ? <>{props.children}</> : <HibanaThemeProvider {...props} />;
}

HibanaThemeProvider.displayName = 'HibanaThemeProvider';

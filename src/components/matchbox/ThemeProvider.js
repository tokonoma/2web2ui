import React from 'react';
import { ThemeProvider as HibanaThemeProvider } from '@sparkpost/matchbox-hibana';
import useHibanaToggle from './useHibanaToggle';

export default function ThemeProvider(props) {
  function OGThemeProvider(props) {
    return <>{props.children}</>;
  }
  return useHibanaToggle(OGThemeProvider, HibanaThemeProvider)(props)();
}

HibanaThemeProvider.displayName = 'HibanaThemeProvider';

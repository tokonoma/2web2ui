import React, { useEffect } from 'react';
import { ThemeProvider } from '@sparkpost/matchbox-hibana';
import { useHibana } from 'src/context/HibanaContext';

export default function HibanaTheme({ children }) {
  const [state] = useHibana();
  const { isHibanaEnabled } = state;

  useEffect(() => {
    if (isHibanaEnabled) {
      document.querySelector('html').classList.remove('og-theme');
      document.querySelector('html').classList.add('hibana-theme');
    } else {
      document.querySelector('html').classList.add('og-theme');
      document.querySelector('html').classList.remove('hibana-theme');
    }
  }, [isHibanaEnabled]);

  return <ThemeProvider>{children}</ThemeProvider>;
}

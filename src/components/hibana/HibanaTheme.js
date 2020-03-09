import React, { useEffect } from 'react';
import { ThemeProvider } from '@sparkpost/matchbox-hibana';
import { useHibana } from 'src/context/HibanaContext';

export default function HibanaTheme({ children }) {
  const [state] = useHibana();
  const { isHibanaEnabled } = state;

  useEffect(() => {
    if (isHibanaEnabled) {
      document.body.classList.remove('og-theme');
      document.body.classList.add('hibana-theme');
    } else {
      document.body.classList.add('og-theme');
      document.body.classList.remove('hibana-theme');
    }
  }, [isHibanaEnabled]);

  return <ThemeProvider>{children}</ThemeProvider>;
}

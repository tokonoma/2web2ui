import React from 'react';
import { ThemeProvider } from 'src/components/matchbox';

export default function HibanaTheme({ children }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}

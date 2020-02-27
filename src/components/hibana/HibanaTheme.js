import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'hibana';
import { useHibana } from 'src/context/HibanaContext';

export default function HibanaTheme({ children }) {
  const [state] = useHibana();
  const { isHibanaEnabled } = state;

  return (
    <>
      {ReactDOM.createPortal(
        <link
          rel="stylesheet"
          type="text/css"
          href={isHibanaEnabled ? '/static/styles-hibana.css' : '/static/styles-default.css'}
          data-id="theme-global-styles"
        />,
        document.head,
      )}

      <ThemeProvider>{children}</ThemeProvider>
    </>
  );
}

import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@sparkpost/matchbox-hibana';
import { useHibana } from 'src/context/HibanaContext';

export default function HibanaTheme({ children }) {
  const [state] = useHibana();
  const { isHibanaEnabled } = state;

  return (
    <>
      {isHibanaEnabled &&
        ReactDOM.createPortal(
          <link
            rel="stylesheet"
            type="text/css"
            href="/static/styles-hibana.css"
            data-id="theme-global-styles"
          />,
          document.head,
        )}

      <ThemeProvider>{children}</ThemeProvider>
    </>
  );
}

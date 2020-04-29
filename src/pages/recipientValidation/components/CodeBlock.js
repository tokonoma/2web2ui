import React from 'react';

import OGStyles from './CodeBlock.module.scss';
import hibanaStyles from './CodeBlockHibana.module.scss';
import useHibanaOverride from 'src/hooks/useHibanaOverride';

export const CodeBlock = ({ children, preformatted = false }) => {
  const styles = useHibanaOverride(OGStyles, hibanaStyles);

  const formattedChildren = preformatted ? (
    <div className={styles.preformattedText}>{children}</div>
  ) : (
    <pre className={styles.textBody}>{children}</pre>
  );

  return <div className={styles.panel}>{formattedChildren}</div>;
};

export default CodeBlock;

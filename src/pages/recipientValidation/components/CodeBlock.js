import React from 'react';
import styles from './CodeBlock.module.scss';

export const CodeBlock = ({ children, preformatted = false }) => {
  const formattedChildren = preformatted ? (
    <div className={styles.preformattedText}>
      {children}
    </div>
  ) : (
    <pre className={styles.textBody}>
      {children}
    </pre>
  );

  return (
    <div className={styles.panel}>
      {formattedChildren}
    </div>
  );
};


export default CodeBlock;

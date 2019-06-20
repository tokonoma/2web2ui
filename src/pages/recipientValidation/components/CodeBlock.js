import React from 'react';
import styles from './CodeBlock.module.scss';

export const CodeBlock = ({ children }) => (
  <div className={styles.panel}>
    <pre className={styles.textBody}>
      {children}
    </pre>
  </div>
);


export default CodeBlock;

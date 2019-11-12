import React from 'react';
import styles from './Card.module.scss';
import cx from 'classnames';

export const Card = ({ children, textAlign }) => (
  <div className={cx(styles.CardContainer, styles[textAlign])}>
    {children}
  </div>
);

export const CardActions = ({ children }) => (<>{children}</>);

export const CardContent = ({ children }) => (<div className={styles.CardContent}>{children}</div>);

export const CardGroup = ({ children }) => <div className={styles.CardGroup}>
  {children}
</div>;

export const CardTitle = ({ children }) => (<div className={styles.CardTitle} role="heading" aria-level="3" >{children}</div>);

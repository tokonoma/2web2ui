import React from 'react';
import styles from './Card.module.scss';
import cx from 'classnames';

export const Card = ({ children, textAlign }) => (
  <div className={cx(styles.CardContainer, styles[textAlign])}>
    {children}
  </div>
);

export const CardActions = ({ children }) => (<>{children}</>);

export const CardContent = ({ children }) => (<p className={styles.CardContent}>{children}</p>);

export const CardTitle = ({ children }) => (<div className={styles.CardTitle} role="heading" aria-level="3" >{children}</div>);

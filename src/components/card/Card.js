import React from 'react';
import styles from './Card.module.scss';
import cx from 'classnames';

const Card = ({ children, textAlign }) => (
  <div className={cx(styles.CardContainer, styles[textAlign])}>
    {children}
  </div>
);
export default Card;

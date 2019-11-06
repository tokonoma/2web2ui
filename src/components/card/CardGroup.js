import React from 'react';
import styles from './Card.module.scss';

const CardGroup = ({ children }) => <div className={styles.CardGroup}>
  {children}
</div>;
export default CardGroup;


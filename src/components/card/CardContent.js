import React from 'react';
import styles from './Card.module.scss';

const CardContent = ({ children }) => (<div className={styles.CardContent}>{children}</div>);
export default CardContent;

import React from 'react';
import styles from './Card.module.scss';


const CardTitle = ({ children }) => (<div className={styles.CardTitle}>{children}</div>);
export default CardTitle;

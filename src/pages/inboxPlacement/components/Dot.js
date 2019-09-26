import React from 'react';
import styles from './Dot.module.scss';

const Dot = ({ backgroundColor }) => (
  <div
    className={styles.Dot}
    style={{ backgroundColor }}
  />
);

export default Dot;

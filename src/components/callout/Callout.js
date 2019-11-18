import React from 'react';
import PropTypes from 'prop-types';
import styles from './Callout.module.scss';

const Callout = ({ children, height, title }) => (
  <div className={styles.Callout} style={{ height }}>
    <div>
      <h3 className={styles.Title}>{title}</h3>
      {children && <p className={styles.Content}>{children}</p>}
    </div>
  </div>
);

Callout.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  height: PropTypes.string
};

Callout.defaultProps = {
  height: '220px'
};

export default Callout;

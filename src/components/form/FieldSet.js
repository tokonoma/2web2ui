import React from 'react';
import PropTypes from 'prop-types';
import styles from './FieldSet.module.scss';

const FieldSet = ({ children, legend }) => (
  <fieldset className={styles.FieldSet}>
    <legend className={styles.Legend}>{legend}</legend>
    {React.Children.map(children, React.cloneElement)}
  </fieldset>
);

FieldSet.propTypes = {
  children: PropTypes.node.isRequired,
  legend: PropTypes.string.isRequired,
};

export default FieldSet;

import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import styles from './Abbreviation.module.scss';

const Abbreviation = ({ title, className, style, children }) => (
  <abbr className={classNames(styles.Abbreviation, className)} title={title} style={style}>
    {children}
  </abbr>
);

Abbreviation.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
};

export default Abbreviation;

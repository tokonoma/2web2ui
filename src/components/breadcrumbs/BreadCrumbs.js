import React from 'react';
import styles from './BreadCrumbs.module.scss';
import classNames from 'classnames';
import PropTypes from 'prop-types';
export const BreadCrumbs = ({ children }) => (
  <div className={styles.BreadCrumbContainer}>
    {React.Children.map(children, (child, index) => (
      <>
        {child}{' '}
        {index + 1 !== React.Children.count(children) && (
          <div className={styles.Arrow}>&nbsp;>&nbsp;</div>
        )}
      </>
    ))}
  </div>
);

export const BreadCrumbsItem = ({ children, active, onClick }) => (
  <span
    onClick={onClick}
    className={classNames(!active && styles.InActiveItem, styles.BreadCrumbItem)}
  >
    {children}{' '}
  </span>
);

BreadCrumbs.propTypes = {
  children: PropTypes.element,
};

BreadCrumbsItem.propTypes = {
  children: PropTypes.element,
  active: PropTypes.bool,
  onClick: PropTypes.func,
};

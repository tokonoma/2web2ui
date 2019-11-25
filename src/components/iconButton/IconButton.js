import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { ScreenReaderOnly } from '@sparkpost/matchbox';
import styles from './IconButton.module.scss';

const IconButton = (props) => {
  const {
    className,
    onClick,
    screenReaderLabel,
    title,
    children,
    disabled,
    'data-id': dataId,
    'aria-expanded': ariaExpanded
  } = props;

  return (
    <button
      className={classNames(styles.IconButton, className)}
      onClick={onClick}
      title={title}
      disabled={disabled ? 'disabled' : null}
      data-id={dataId}
      aria-expanded={ariaExpanded}
    >
      {children}

      <ScreenReaderOnly>{screenReaderLabel}</ScreenReaderOnly>
    </button>
  );
};

IconButton.propTypes = {
  screenReaderLabel: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
  title: PropTypes.string,
  disabled: PropTypes.bool,
  'data-id': PropTypes.string,
  'aria-expanded': PropTypes.oneOf([ 'true', 'false' ])
};

export default IconButton;

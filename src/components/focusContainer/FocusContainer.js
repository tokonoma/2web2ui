import React, { useEffect, useRef } from 'react';
import classNames from 'classnames';
import styles from './FocusContainer.module.scss';

// see, https://stackoverflow.com/a/53188569
const FocusContainer = ({ className, ...props }) => {
  const ref = useRef(null);

  useEffect(() => {
    ref.current.focus();
  }, []);

  return (
    <div
      {...props}
      className={classNames(className, styles.FocusContainer)}
      ref={ref}
      tabIndex="-1"
    />
  );
};

export default FocusContainer;

import React, { useEffect, useRef } from 'react';
import styles from './FocusContainer.module.scss';

// see, https://stackoverflow.com/a/53188569
const FocusContainer = (props) => {
  const ref = useRef(null);

  useEffect(() => {
    ref.current.focus();
  }, []);

  return <div className={styles.FocusContainer} {...props} ref={ref} tabIndex="-1" />;
};

export default FocusContainer;

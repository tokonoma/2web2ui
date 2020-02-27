import React from 'react';
import { Button } from 'hibana';
import { useHibana } from 'src/context/HibanaContext';
import styles from './HibanaComponents.module.scss';

export default function HibanaToggle() {
  const [state, dispatch] = useHibana();
  const { isHibanaEnabled } = state;

  if (isHibanaEnabled) {
    return (
      <Button
        color="blue"
        className={styles.HibanaToggle}
        onClick={() => dispatch({ type: 'DISABLE' })}
      >
        That&rsquo;s fine, take me back
      </Button>
    );
  }

  return (
    <Button
      color="blue"
      className={styles.HibanaToggle}
      onClick={() => dispatch({ type: 'ENABLE' })}
    >
      Take a Look
    </Button>
  );
}

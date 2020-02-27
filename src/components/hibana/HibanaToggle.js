import React from 'react';
import { Button } from 'hibana';
import { useHibana } from 'src/context/HibanaContext';
import styles from './HibanaComponents.module.scss';

export default function HibanaToggle() {
  const [state, dispatch] = useHibana();
  const { isHibanaEnabled } = state;

  return (
    <Button
      color="blue"
      className={styles.HibanaToggle}
      onClick={() => dispatch({ type: isHibanaEnabled ? 'DISABLE' : 'ENABLE' })}
    >
      {isHibanaEnabled ? <>Take a Look</> : <>That&rsquo;s fine, take me back</>}
    </Button>
  );
}

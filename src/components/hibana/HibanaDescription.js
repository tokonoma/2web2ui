import React from 'react';
import { useHibana } from 'src/context/HibanaContext';
import styles from './HibanaComponents.module.scss';

export default function HibanaDescription() {
  const [state] = useHibana();
  const { isHibanaEnabled } = state;

  if (isHibanaEnabled) {
    return (
      <p className={styles.HibanaDescription}>
        Going back means you won&rsquo;t get to experience the all new SparkPost app!
      </p>
    );
  }

  return (
    <p className={styles.HibanaDescription}>
      We&rsquo;ve been working hard redesigning the SparkPost app for a better&nbsp;experience
    </p>
  );
}

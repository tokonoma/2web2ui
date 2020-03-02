import React from 'react';
import { useHibana } from 'src/context/HibanaContext';
import styles from './HibanaComponents.module.scss';

export default function HibanaDescription() {
  const [state] = useHibana();
  const { isHibanaEnabled } = state;

  return (
    <div className={styles.HibanaDescription}>
      <p className={styles.HibanaDescriptionParagraph}>
        {isHibanaEnabled ? (
          <>Going back means you won&rsquo;t get to experience the all new SparkPost app!</>
        ) : (
          <>
            We&rsquo;ve been working hard redesigning the SparkPost app for a better&nbsp;experience
          </>
        )}
      </p>
    </div>
  );
}

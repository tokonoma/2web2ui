import React from 'react';
import { ScreenReaderOnly } from '@sparkpost/matchbox';
import { SparkPost } from 'src/components';
import styles from './DesktopNavigation.module.scss';

export default function DesktopNavigation() {
  return (
    <div className={styles.Base}>
      <div>
        <SparkPost.Logo className={styles.Logo} />
      </div>

      {/* Visually hidden headings to help guide screen reader users */}
      <ScreenReaderOnly>
        <h2>Main Navigation</h2>
      </ScreenReaderOnly>

      <ScreenReaderOnly>
        <h3>Category Navigation</h3>
      </ScreenReaderOnly>
    </div>
  );
}

import React from 'react';
import WindowSize from 'src/context/WindowSize';
import styles from './Layout.module.scss';

const Fullscreen = ({ children }) => (
  <WindowSize>
    <div className={`${styles.wrapper} ${styles.fullscreen}`}>
      <main role="main" className={styles.content}>
        {children}
      </main>
    </div>
  </WindowSize>
);

export default Fullscreen;

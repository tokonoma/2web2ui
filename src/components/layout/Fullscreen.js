import React from 'react';
import ScrollToTop from './ScrollToTop';
import WindowSize from 'src/context/WindowSize';
import styles from './Layout.module.scss';

const Fullscreen = ({ children }) => (
  <WindowSize>
    <div className={`${styles.wrapper} ${styles.fullscreen}`}>
      <main role="main" className={styles.content}>
        {children}
      </main>
      <ScrollToTop/>
    </div>
  </WindowSize>
);

export default Fullscreen;

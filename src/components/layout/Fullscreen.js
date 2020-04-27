import React from 'react';
import WindowSize from 'src/context/WindowSize';
import useHibanaOverride from 'src/hooks/useHibanaOverride';
import OGStyles from './Layout.module.scss';
import hibanaStyles from './LayoutHibana.module.scss';

const Fullscreen = ({ children }) => {
  const styles = useHibanaOverride(OGStyles, hibanaStyles);

  return (
    <WindowSize>
      <div className={`${styles.wrapper} ${styles.fullscreen}`}>
        <main role="main" tabIndex="-1" id="main-content" className={styles.FullscreenContent}>
          {children}
        </main>
      </div>
    </WindowSize>
  );
};

export default Fullscreen;

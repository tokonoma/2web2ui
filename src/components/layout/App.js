import React from 'react';
import ScrollToTop from './ScrollToTop';
import cx from 'classnames';
import Navigation from 'src/components/navigation/Navigation';
import { Navigation as HibanaNavigation } from 'src/components/hibana';
import WindowSize from 'src/context/WindowSize';
import styles from './Layout.module.scss';
import withContext from 'src/context/withContext';
import { BannerContext } from 'src/context/GlobalBanner';
import { useHibana } from 'src/context/HibanaContext';

export const App = ({ children, bannerOpen }) => {
  const [state] = useHibana();
  const { isHibanaEnabled } = state;

  return (
    <WindowSize>
      <div className={cx(styles.wrapper, styles.app)}>
        {isHibanaEnabled ? <HibanaNavigation /> : <Navigation />}
        <main role="main" className={cx(styles.content, bannerOpen && styles.bannerOpen)}>
          <div className={styles.container}>{children}</div>
        </main>
        <ScrollToTop />
      </div>
    </WindowSize>
  );
};

export default withContext(BannerContext, App);

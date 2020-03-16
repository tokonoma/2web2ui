import React from 'react';
import ScrollToTop from './ScrollToTop';
import cx from 'classnames';
import Navigation from 'src/components/navigation/Navigation';
import { Navigation as HibanaNavigation } from 'src/components/hibana';
import WindowSize from 'src/context/WindowSize';
import OGStyles from './Layout.module.scss';
import hibanaStyles from './LayoutHibana.module.scss';
import withContext from 'src/context/withContext';
import { BannerContext } from 'src/context/GlobalBanner';
import { useHibana } from 'src/context/HibanaContext';
import useHibanaOverride from 'src/hooks/useHibanaOverride';

export const App = ({ children, bannerOpen }) => {
  const [state] = useHibana();
  const { isHibanaEnabled } = state;
  const styles = useHibanaOverride(OGStyles, hibanaStyles);

  return (
    <WindowSize>
      <div className={cx(styles.wrapper, styles.app)}>
        {isHibanaEnabled ? <HibanaNavigation className={styles.header} /> : <Navigation />}

        <main
          role="main"
          tabIndex="-1"
          id="main-content"
          className={cx(styles.content, bannerOpen && styles.bannerOpen)}
        >
          <div className={styles.container}>{children}</div>
        </main>
        <ScrollToTop />
      </div>
    </WindowSize>
  );
};

export default withContext(BannerContext, App);

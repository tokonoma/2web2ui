import React from 'react';
import ScrollToTop from './ScrollToTop';
import Navigation from 'src/components/navigation/Navigation';
import WindowSize from 'src/context/WindowSize';
import styles from './Layout.module.scss';
import withContext from 'src/context/withContext';
import { BannerContext } from 'src/context/GlobalBanner';
import cx from 'classnames';

const App = ({ children, bannerOpen }) => (
  <WindowSize>
    <div className={cx(styles.wrapper, styles.app)}>
      <Navigation />
      <main role="main" className={cx(styles.content, bannerOpen && styles.bannerOpen)}>
        <div className={styles.container}>
          {children}
        </div>
      </main>
      <ScrollToTop/>
    </div>
  </WindowSize>
);


export default withContext(BannerContext, App);

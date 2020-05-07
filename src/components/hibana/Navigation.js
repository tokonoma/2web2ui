import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import DesktopNavigation from './DesktopNavigation';
import MobileNavigation from './MobileNavigation';
import { selectHibanaNavItems } from 'src/selectors/navItems';
import withContext from 'src/context/withContext';
import { BannerContext } from 'src/context/GlobalBanner';
import PendingCancelGlobalBanner from 'src/pages/billing/components/PendingCancelGlobalBanner';

function Navigation(props) {
  const { className, location, navItems, bannerOpen } = props;

  return (
    <>
      {bannerOpen && <PendingCancelGlobalBanner />}

      <header className={className}>
        <DesktopNavigation navItems={navItems} location={location} />

        <MobileNavigation navItems={navItems} location={location} />
      </header>
    </>
  );
}

export default withRouter(
  connect(state => ({
    navItems: selectHibanaNavItems(state),
  }))(withContext(BannerContext, Navigation)),
);

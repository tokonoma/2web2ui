import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import DesktopNavigation from './DesktopNavigation';
import MobileNavigation from './MobileNavigation';
import { selectNavItems } from 'src/selectors/navItems';
import withContext from 'src/context/withContext';
import { BannerContext } from 'src/context/GlobalBanner';

function Navigation({ className, navItems, location }) {
  // Filter out nav items not needed in Hibana design
  // TODO: Remove and reconfigure the `navItems` config file when Hibana becomes the default
  const primaryNavItems = navItems.filter(item => {
    if (item.label !== 'Dashboard' && item.label !== 'Configuration' && item.label !== 'Alerts') {
      return item;
    }
  });

  return (
    <header className={className}>
      <DesktopNavigation navItems={primaryNavItems} location={location} />

      <MobileNavigation navItems={navItems} location={location} />
    </header>
  );
}

export default withRouter(
  connect(state => ({
    navItems: selectNavItems(state),
  }))(withContext(BannerContext, Navigation)),
);

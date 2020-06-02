import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import DesktopNavigation from './DesktopNavigation';
import MobileNavigation from './MobileNavigation';
import { selectHibanaNavItems } from 'src/selectors/navItems';
import { GlobalBanner } from 'src/components/globalBanner';

function Header(props) {
  const { className, location, navItems } = props;

  return (
    <header className={className}>
      <GlobalBanner />

      <DesktopNavigation navItems={navItems} location={location} />

      <MobileNavigation navItems={navItems} location={location} />
    </header>
  );
}

export default withRouter(
  connect(state => ({
    navItems: selectHibanaNavItems(state),
  }))(Header),
);

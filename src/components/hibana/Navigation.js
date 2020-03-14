import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import DesktopNavigation from './DesktopNavigation';
import MobileNavigation from './MobileNavigation';
import { selectNavItems } from 'src/selectors/navItems';
import { hasGrants } from 'src/helpers/conditions';
import withContext from 'src/context/withContext';
import { BannerContext } from 'src/context/GlobalBanner';

function Navigation(props) {
  const { className, navItems, location, hasRVGrant } = props;

  // Filter out nav items not needed in Hibana design
  // TODO: Remove and reconfigure the `navItems` config file when Hibana becomes the default
  const primaryNavItems = navItems
    .map(item => {
      // 'Configuration' and 'Alerts' will be in the account dropdown, not the main nav
      if (item.label !== 'Dashboard' && item.label !== 'Configuration' && item.label !== 'Alerts') {
        if (item.label === 'Recipients') {
          // If the user has the RV grant, default to RV, otherwise default to Recipient Lists
          if (hasRVGrant) {
            return { ...item, to: '/recipient-validation/list' };
          }

          return { ...item, to: '/lists/recipient-lists' };
        }

        return item;
      }
    })
    .filter(Boolean);

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
    hasRVGrant: hasGrants('recipient-validation/preview')(state),
  }))(withContext(BannerContext, Navigation)),
);

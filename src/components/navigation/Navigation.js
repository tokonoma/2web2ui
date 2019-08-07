import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';

import { WindowSizeContext } from 'src/context/WindowSize';
import { selectNavItems } from 'src/selectors/navItems';
import styles from './Navigation.module.scss';
import Top from './components/Top';
import NavItem from './components/NavItem';
import NavGroup from './components/NavGroup';
import { BannerContext } from 'src/context/GlobalBanner';
import withContext from 'src/context/withContext';
import { formatDate } from 'src/helpers/date';
import { Button } from '@sparkpost/matchbox';

const PendingCancellationBanner = ({ onClose }) => (
  <div className={styles.banner}>
    <span>Your account will be cancelled on </span>
    {formatDate(new Date())}
    <span>, and you will no longer be able to send email or login. Changed your mind?</span>
    <Button color='orange' flat><div style={{ color: 'white', border: '2px solid white' }}>Don't Cancel</div></Button>
  </div>
);

export class Navigation extends Component {
  state = {
    open: false
  };

  renderItems() {
    return this.props.navItems.map((item, key) => {
      const props = { ...item, toggleMobileNav: this.toggleMobileNav, location: this.props.location, key: key };
      return item.children ? <NavGroup {...props} /> : <NavItem {...props} />;
    });
  }

  toggleMobileNav = () => {
    this.setState({ open: !this.state.open });
  };

  renderNav = ({ mobile }) => {
    const asideClasses = classnames(styles.Aside, mobile && styles.mobile);
    const listClasses = classnames(styles.List, mobile && styles.mobile);
    const navClasses = classnames(styles.Navigation, mobile && styles.mobile, this.state.open && styles.show);
    const overlayClasses = classnames(styles.Overlay, this.state.open && styles.show);
    const wrapperClasses = classnames(styles.Wrapper, this.props.bannerOpen && styles.bannerOpen);

    return (
      <Fragment>
        {mobile && <div className={overlayClasses} onClick={this.toggleMobileNav}/>}
        <Top toggleMobileNav={this.toggleMobileNav} open={this.state.open} />
        <div className={asideClasses}>
          {this.props.bannerOpen && (
            <PendingCancellationBanner />
          )}
          <nav className={navClasses}>
            <div className={wrapperClasses}>
              <ul className={listClasses}>
                {this.renderItems()}
              </ul>
            </div>
          </nav>
        </div>
      </Fragment>
    );
  };

  render() {
    return <WindowSizeContext.Consumer children={this.renderNav} />;
  }
}

export default withRouter(connect((state) => ({
  navItems: selectNavItems(state)
}))(withContext(BannerContext, Navigation)));

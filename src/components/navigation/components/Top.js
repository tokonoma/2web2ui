import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { SparkPost } from 'src/components';
import { WindowSizeContext } from 'src/context/WindowSize';
import { UnstyledLink, ScreenReaderOnly } from '@sparkpost/matchbox';
import { HelpOutline, Menu, Close } from '@sparkpost/matchbox-icons';
import { openSupportPanel } from 'src/actions/support';
import AccountDropdown from './AccountDropdown';
import NotificationCenter from 'src/components/notifications/NotificationCenter';
import styles from './Top.module.scss';
import { DEFAULT_REDIRECT_ROUTE } from 'src/constants';

export class Top extends Component {
  renderMobile = () => (
    <div className={styles.Top} onClick={this.props.open ? this.props.toggleMobileNav : undefined}>
      <UnstyledLink
        onClick={!this.props.open ? this.props.toggleMobileNav : undefined}
        className={styles.Menu}
        to="javascript:void(0);"
        role="button"
        aria-expanded={this.props.open}
        aria-controls="mobile-navigation-wrapper"
        data-id="top-navigation-button"
      >
        {this.props.open ? <Close size={24}/> : <Menu size={24}/>}

        <ScreenReaderOnly>Menu</ScreenReaderOnly>
      </UnstyledLink>

      <Link to={DEFAULT_REDIRECT_ROUTE} className={styles.MobileLogo}>
        <SparkPost.Logo type='halfWhite' />
      </Link>

      <div className={styles.MobileAccountDropdownWrapper}>
        <AccountDropdown />
      </div>
    </div>
  );

  renderDesktop = () => (
    <div className={styles.Top}>
      <Link to={DEFAULT_REDIRECT_ROUTE} className={styles.Logo}><SparkPost.Logo type='halfWhite' /></Link>
      <div className={styles.RightSideWrapper}>
        <NotificationCenter />

        <button title="Opens a dialog" onClick={this.openSupportPanel} className={styles.SupportButton}>
          <HelpOutline className={styles.SupportIcon} size={22} />

          <ScreenReaderOnly>Help</ScreenReaderOnly>
        </button>

        <AccountDropdown />
      </div>
    </div>
  );

  openSupportPanel = () => { this.props.openSupportPanel(); }

  render() {
    return (
      <WindowSizeContext.Consumer children={({ mobile }) => mobile ? this.renderMobile() : this.renderDesktop()} />
    );
  }
}

export default connect(undefined, { openSupportPanel })(Top);

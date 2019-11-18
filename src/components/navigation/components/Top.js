import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { SparkPost, IconButton } from 'src/components';
import { WindowSizeContext } from 'src/context/WindowSize';
import { ScreenReaderOnly } from '@sparkpost/matchbox';
import { HelpOutline, Menu, Close } from '@sparkpost/matchbox-icons';
import { openSupportPanel } from 'src/actions/support';
import AccountDropdown from './AccountDropdown';
import NotificationCenter from 'src/components/notifications/NotificationCenter';
import styles from './Top.module.scss';
import { DEFAULT_REDIRECT_ROUTE } from 'src/constants';

export class Top extends Component {
  renderMobile = () => (
    <div className={styles.Top} onClick={this.props.open ? this.props.toggleMobileNav : undefined}>
      <button
        onClick={!this.props.open ? this.props.toggleMobileNav : undefined}
        className={styles.Menu}
        aria-expanded={this.props.open}
        data-id="nav-button-mobilemenu"
      >
        {this.props.open ? <Close size={24}/> : <Menu size={24}/>}

        <ScreenReaderOnly>Menu</ScreenReaderOnly>
      </button>

      <Link to={DEFAULT_REDIRECT_ROUTE} className={styles.MobileLogo} data-id="nav-link-mobilelogo">
        <SparkPost.Logo type='halfWhite' />
      </Link>

      <div className={styles.MobileAccountDropdownWrapper}>
        <AccountDropdown />
      </div>
    </div>
  );

  renderDesktop = () => (
    <div className={styles.Top}>
      <Link to={DEFAULT_REDIRECT_ROUTE} className={styles.Logo} data-id="nav-link-logo">
        <SparkPost.Logo type='halfWhite' />
      </Link>

      <div className={styles.RightSideWrapper}>
        <NotificationCenter />

        <IconButton
          title="Opens a dialog"
          onClick={this.openSupportPanel}
          className={styles.SupportButton}
          data-id="nav-button-help"
          screenReaderLabel="Help"
        >
          <HelpOutline className={styles.SupportIcon} size={22} />
        </IconButton>

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

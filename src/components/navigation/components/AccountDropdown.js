import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { WindowSizeContext } from 'src/context/WindowSize';
import { selectAccountNavItems } from 'src/selectors/navItems';
import { Popover } from '@sparkpost/matchbox';
import { ActionList, Tag, ScreenReaderOnly } from 'src/components/matchbox';
import { ArrowDropDown, Person } from '@sparkpost/matchbox-icons';
import styles from './AccountDropdown.module.scss';

export class AccountDropdown extends Component {
  state = {
    // Using controlled open state so we can close the popover on click
    open: false,
  };

  toggleDropdown = () => {
    this.setState({ open: !this.state.open });
  };

  renderActivator = () => (
    <WindowSizeContext.Consumer>
      {({ mobile }) => (
        <button
          className={styles.Email}
          onClick={this.toggleDropdown}
          data-id="nav-button-accounts"
        >
          {mobile || !this.props.email ? (
            <Person size={24} />
          ) : (
            <Fragment>
              {this.props.email}&nbsp;
              <ArrowDropDown />
            </Fragment>
          )}

          <ScreenReaderOnly>Settings</ScreenReaderOnly>
        </button>
      )}
    </WindowSizeContext.Consumer>
  );

  getItems() {
    const { accountNavItems, dispatch } = this.props;
    const items = accountNavItems.map(
      ({ action, label, external, icon: Icon, labs, to, secondaryLabel, ...rest }) => {
        const content = (
          <>
            {label}
            {Icon && (
              <div className={styles.FloatIcon}>
                <Icon size={15} />
              </div>
            )}
            {labs && (
              <div className={styles.FloatIcon}>
                <Tag color="blue">LABS</Tag>
              </div>
            )}
            {secondaryLabel && (
              <div className={styles.FloatIcon}>
                <div className={styles.SecondaryLabel}>{secondaryLabel}</div>
              </div>
            )}
          </>
        );

        const listItem = { content, label, external, to, ...rest };

        if (!external && to) {
          listItem.component = Link;
        }

        if (action) {
          listItem.onClick = () => dispatch(action());
        }

        return listItem;
      },
    );

    return items;
  }

  render() {
    return (
      <Popover
        left
        trigger={this.renderActivator()}
        open={this.state.open}
        onClose={this.toggleDropdown}
      >
        <ActionList
          className={styles.AccountList}
          onClick={this.toggleDropdown}
          actions={this.getItems()}
          data-id="account-dropdown-list"
        />
      </Popover>
    );
  }
}

const mapStateToProps = state => ({
  email: state.currentUser.email,
  accountNavItems: selectAccountNavItems(state),
});

export default connect(mapStateToProps)(AccountDropdown);

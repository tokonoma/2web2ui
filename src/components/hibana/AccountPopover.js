import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { ActionList, Popover, ScreenReaderOnly } from 'src/components/matchbox';
import { Person } from '@sparkpost/matchbox-icons';
import { selectHibanaAccountNavItems } from 'src/selectors/navItems';
import { shrinkToFit } from 'src/helpers/string';
import styles from './AccountPopover.module.scss';

function AccountPopover(props) {
  const { accountItems, currentUser, dispatch } = props;
  const [isOpen, setIsOpen] = useState(false);

  const togglePopover = () => setIsOpen(!isOpen);

  return (
    <div className={styles.AccountPopover} data-id="desktop-navigation-account-popover">
      <Popover
        trigger={
          <PopoverTrigger isOpen={isOpen} currentUser={currentUser} onClick={togglePopover} />
        }
        left
        open={isOpen}
        onClose={togglePopover}
      >
        {currentUser && (
          <div className={styles.AccountPopoverHeader}>
            {(currentUser.email || currentUser.customer) && (
              <div className={styles.AccountPopoverUserInfo}>
                {currentUser.email ? shrinkToFit(currentUser.email, 25) : currentUser.customer}
              </div>
            )}

            {currentUser.access_level && (
              <div className={styles.AccountPopoverSupplemental}>{currentUser.access_level}</div>
            )}
          </div>
        )}

        <ActionList
          data-id="desktop-navigation-account-actionlist"
          onClick={togglePopover}
          actions={accountItems.map(item => {
            return {
              content: <PopoverItem item={item} />,
              external: item.external,
              onClick: item.action && (() => dispatch(item.action())),
              to: item.to,
              component: !item.external && item.to ? Link : undefined,
              section: item.section,
            };
          })}
        />
      </Popover>
    </div>
  );
}

function PopoverTrigger({ currentUser, onClick, isOpen }) {
  const getFirstCharacter = str => {
    if (str && str.length > 0) {
      return str.charAt(0).toUpperCase();
    }

    return null;
  };

  const { loading: isCurrentUserLoading, first_name, last_name } = currentUser;
  const firstInitial = getFirstCharacter(first_name);
  const lastInitial = getFirstCharacter(last_name);

  return (
    <button
      onClick={onClick}
      className={classNames(styles.AccountPopoverButton, isOpen && styles.isOpen)}
      disabled={isCurrentUserLoading}
      data-id="desktop-navigation-account-popover-trigger"
    >
      {!isCurrentUserLoading && (
        <>
          {firstInitial && lastInitial ? (
            <span aria-hidden="true">
              {firstInitial}
              {lastInitial}
            </span>
          ) : (
            <Person className={styles.AccountPopoverIcon} />
          )}

          <ScreenReaderOnly>Account Menu</ScreenReaderOnly>
        </>
      )}
    </button>
  );
}

function PopoverItem({ item }) {
  const { label, icon: Icon, secondaryLabel } = item;

  return (
    <div className={styles.PopoverItem}>
      {label}

      {Icon && <Icon className={styles.PopoverItemIcon} size={15} />}

      {secondaryLabel && <div>{secondaryLabel}</div>}
    </div>
  );
}

const mapStateToProps = state => ({
  currentUser: state.currentUser,
  accountItems: selectHibanaAccountNavItems(state),
});

export default connect(mapStateToProps)(AccountPopover);

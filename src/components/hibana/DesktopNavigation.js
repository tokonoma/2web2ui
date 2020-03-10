import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { ScreenReaderOnly } from '@sparkpost/matchbox';
import { Inline } from 'src/components/matchbox';
import { SparkPost } from 'src/components';
import styles from './DesktopNavigation.module.scss';

export default function DesktopNavigation({ navItems, location }) {
  const isActive = navItem => {
    if (
      location.pathname.includes('/reports/message-events') &&
      navItem.label === 'Signals Analytics'
    ) {
      return false;
    }

    if (navItem.children) {
      const hasActiveChild = navItem.children.some(child => {
        return location.pathname === child.to;
      });

      return hasActiveChild;
    }

    if (location.pathname.includes(navItem.to)) {
      return true;
    }
  };

  return (
    <div className={styles.DesktopNavigation} data-id="desktop-navigation">
      <div className={styles.Wrapper}>
        <div className={styles.SubWrapper}>
          <SkipLink />

          <div className={styles.PrimaryNavLayout}>
            <div className={styles.LogoWrapper}>
              <Link to="/dashboard">
                <SparkPost.Logo className={styles.Logo} />
              </Link>
            </div>

            <nav className={styles.PrimaryNav}>
              {/* Visually hidden headings to help guide screen reader users */}
              <ScreenReaderOnly>
                <h2>Main Navigation</h2>
              </ScreenReaderOnly>

              <Inline>
                {navItems.map((item, index) => {
                  // TODO: This can be cleaned up post OG theme removal - by updating the navItems config
                  return (
                    <NavLink
                      variant="primary"
                      to={item.to}
                      key={`nav-item-${index}`}
                      isActive={isActive(item)}
                    >
                      {item.label}
                    </NavLink>
                  );
                })}
              </Inline>
            </nav>

            {/* TODO: Implement in FE-924 */}
            <AccountDropdown>
              <button className={styles.AccountDropdownButton}>
                <span aria-hidden="true">SP</span>

                <ScreenReaderOnly>Account Menu</ScreenReaderOnly>
              </button>
            </AccountDropdown>
          </div>
        </div>
      </div>

      {navItems.map(item => {
        if (isActive(item) && item.children) {
          return (
            <nav className={styles.SecondaryNav} key="secondary-nav" data-id="secondary-navigation">
              <div className={styles.Wrapper}>
                <div className={styles.SubWrapper}>
                  {/* Visually hidden headings to help guide screen reader users */}
                  <ScreenReaderOnly>
                    <h3>Category Navigation</h3>
                  </ScreenReaderOnly>

                  <Inline>
                    {item.children.map((childItem, index) => {
                      return (
                        <NavLink
                          variant="secondary"
                          to={childItem.to}
                          key={`subnav-item-${index}`}
                          isActive={location.pathname.includes(childItem.to)}
                        >
                          {childItem.label}
                        </NavLink>
                      );
                    })}
                  </Inline>
                </div>
              </div>
            </nav>
          );
        }
      })}
    </div>
  );
}

function NavLink(props) {
  const { variant, children, to, isActive } = props;

  return (
    <Link
      to={to}
      className={classNames(styles.NavLink, styles[variant], isActive ? styles.isActive : null)}
    >
      {children}
    </Link>
  );
}

function SkipLink() {
  return (
    <a href="#main-content" className={styles.SkipLink}>
      Skip to Main Content
    </a>
  );
}

function AccountDropdown({ children }) {
  return <div className={styles.AccountDropdownWrapper}>{children}</div>;
}

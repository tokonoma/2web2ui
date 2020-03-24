import React from 'react';
import classNames from 'classnames';
import { ScreenReaderOnly } from '@sparkpost/matchbox';
import { PageLink } from 'src/components/links';
import { Inline } from 'src/components/matchbox';
import { SparkPost } from 'src/components';
import findRouteByPath from 'src/helpers/findRouteByPath';
import styles from './DesktopNavigation.module.scss';

export default function DesktopNavigation({ navItems, location }) {
  const { category, subcategory } = findRouteByPath(location.pathname);

  const isCategoryActive = navItem => category === navItem.label;

  return (
    <div className={styles.DesktopNavigation} data-id="desktop-navigation">
      <NavWrapper>
        <SkipLink />

        <div className={styles.PrimaryNavLayout}>
          <div className={styles.LogoWrapper}>
            <PageLink to="/dashboard">
              <SparkPost.Logo className={styles.Logo} />
            </PageLink>
          </div>

          <nav className={styles.PrimaryNav} aria-labelledby="primary-nav-heading">
            {/* Visually hidden headings to help guide screen reader users */}
            <ScreenReaderOnly>
              <h2 id="primary-nav-heading">Main</h2>
            </ScreenReaderOnly>

            <Inline>
              {navItems.map((item, index) => {
                return (
                  <NavLink
                    variant="primary"
                    to={item.to}
                    key={`nav-item-${index}`}
                    isActive={isCategoryActive(item)}
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
      </NavWrapper>

      {navItems.map(item => {
        if (isCategoryActive(item) && item.children) {
          return (
            <nav
              className={styles.SecondaryNav}
              key="secondary-nav"
              aria-labelledby="secondary-nav-heading"
              data-id="secondary-navigation"
            >
              <NavWrapper>
                {/* Visually hidden headings to help guide screen reader users */}
                <ScreenReaderOnly>
                  <h3 id="secondary-nav-heading">Secondary</h3>
                </ScreenReaderOnly>

                <Inline>
                  {item.children.map((childItem, index) => {
                    return (
                      <NavLink
                        variant="secondary"
                        to={childItem.to}
                        key={`subnav-item-${index}`}
                        isActive={subcategory === childItem.label}
                      >
                        {childItem.label}
                      </NavLink>
                    );
                  })}
                </Inline>
              </NavWrapper>
            </nav>
          );
        }
      })}
    </div>
  );
}

function NavWrapper({ children }) {
  return (
    <div className={styles.Wrapper}>
      <div className={styles.SubWrapper}>{children}</div>
    </div>
  );
}

function NavLink(props) {
  const { variant, children, to, isActive } = props;

  return (
    <PageLink
      to={to}
      className={classNames(styles.NavLink, styles[variant], isActive ? styles.isActive : null)}
    >
      {children}
    </PageLink>
  );
}

// Allows keyboard-only users to skip the navigation
// See: https://webaim.org/techniques/skipnav/
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

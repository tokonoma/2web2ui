import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { ScreenReaderOnly } from '@sparkpost/matchbox';
import { Inline } from 'src/components/matchbox';
import { SparkPost } from 'src/components';
import styles from './DesktopNavigation.module.scss';

export default function DesktopNavigation() {
  return (
    <div className={styles.Base}>
      <div className={styles.SubWrapper}>
        <SkipLink />

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

          {/* using ARIA roles instead of list elements to avoid style overrides */}
          <Inline>
            <NavLink variant="primary" to="/summary">
              Signals Analytics
            </NavLink>

            <NavLink variant="primary" to="/summary">
              Events
            </NavLink>

            <NavLink variant="primary" to="/summary">
              Content
            </NavLink>

            <NavLink variant="primary" to="/summary">
              Recipients
            </NavLink>

            <NavLink variant="primary" to="/summary">
              Configuration
            </NavLink>
          </Inline>
        </nav>

        <div className={styles.AccountDropdownWrapper}>
          <button className={styles.AccountDropdownButton}>SP</button>
        </div>
      </div>

      <div className={styles.SubWrapper}>
        <nav>
          <ScreenReaderOnly>
            <h3>Category Navigation</h3>
          </ScreenReaderOnly>
        </nav>
      </div>
    </div>
  );
}

function NavLink(props) {
  const { variant, children, to, isActive } = props;

  return (
    <Link
      to={to}
      className={classNames(
        styles.NavLink,
        styles[variant],
        isActive ? styles.NavLinkActive : null,
      )}
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

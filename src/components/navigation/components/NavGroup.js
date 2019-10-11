import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import _ from 'lodash';
import { ChevronLeft } from '@sparkpost/matchbox-icons';

import NavItem from './NavItem';
import styles from './NavItem.module.scss';

const NavGroup = (props) => {
  const [open, setOpen] = useState(false);

  const {
    children,
    icon: Icon,
    label,
    toggleMobileNav,
    mobile,
    location
  } = props;

  useEffect(() => {
    const isAChildActive = _.some(children, (child) => location.pathname.includes(child.to));

    if (isAChildActive) {
      setOpen(true);
    }
  },
  [children, location.pathname]
  );

  const linkClasses = classnames(
    styles.Link,
    styles.hasChildren,
    open && styles.isOpen,
    mobile && styles.mobile
  );

  return (
    <li>
      {/* eslint-disable jsx-a11y/anchor-is-valid */}
      <a
        onClick={() => setOpen(!open)}
        className={linkClasses}
        aria-expanded={open ? 'true' : 'false'}
        role="button"
        href="javascript:void(0);"
      >
        <span className={styles.iconWrapper}>
          <Icon size={21} className={styles.icon}/>
        </span>
        <div className={styles.Label}>{label}</div>
        <ChevronLeft className={styles.chevron}/>
      </a>

      <ul className={styles.NestedList}>
        {children.map((child, key) => <NavItem {...child} mobile={mobile} location={location} key={key} toggleMobileNav={toggleMobileNav}/>)}
      </ul>
    </li>
  );
};

export default NavGroup;


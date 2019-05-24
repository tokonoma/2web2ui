import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import _ from 'lodash';
import { ChevronLeft } from '@sparkpost/matchbox-icons';

import RenderItem from './Item';
import styles from './Item.module.scss';

export default function (props) {
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

    isAChildActive ? setOpen(true) : null;
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
      <a onClick={() => setOpen(!open)} className={linkClasses}>
        <span className={styles.iconWrapper}><Icon size={21} className={styles.icon}/></span>
        <div className={styles.Label}>{label}</div>
        <ChevronLeft className={styles.chevron}/>
      </a>
      <ul className={styles.NestedList}>
        {children.map((child, key) => <RenderItem {...child} mobile={mobile} location={location} key={key}
          toggleMobileNav={toggleMobileNav}/>)}
      </ul>
    </li>
  );
}


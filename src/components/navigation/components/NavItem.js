import React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { Tag } from '@sparkpost/matchbox';
import styles from './NavItem.module.scss';

const TAGS = {
  beta: { label: 'BETA' },
  new: { color: 'blue', label: 'NEW' },
  labs: { label: 'LABS' }
};


const NavItem = (props) => {
  const {
    divider,
    icon: Icon,
    label,
    tag,
    to,
    toggleMobileNav,
    mobile,
    location
  } = props;

  const active = location.pathname.includes(to);

  const linkClasses = classnames(
    styles.Link,
    active && styles.isActive,
    mobile && styles.mobile,
    divider && styles.divider
  );

  let releaseTag;

  if (tag) {
    const tagSpec = TAGS[tag];
    releaseTag = <Tag color={tagSpec.color}>{tagSpec.label}</Tag>;
  }

  return (
    <li>
      <Link to={to} className={linkClasses} onClick={mobile ? toggleMobileNav : null}>
        {Icon && <span className={styles.iconWrapper}><Icon size={21} className={styles.icon}/></span>}
        <div className={styles.Label}>{label}</div>
        {releaseTag && <div className={styles.releaseTag}>{releaseTag}</div>}
      </Link>
    </li>
  );
};

NavItem.displayName = 'NavItem';
export default NavItem;

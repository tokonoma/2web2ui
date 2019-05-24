import React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { Tag } from '@sparkpost/matchbox';
import styles from './Item.module.scss';

const TAGS = {
  beta: { label: 'BETA' },
  new: { color: 'blue', label: 'NEW' },
  labs: { label: 'LABS' }
};


export default function (props) {
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
    mobile && styles.mobile
  );

  let releaseTag;

  if (tag) {
    const tagSpec = TAGS[tag];
    releaseTag = <Tag color={tagSpec.color}>{tagSpec.label}</Tag>;
  }

  return (
    <li>
      {divider && <hr className={styles.divider}/>}
      <Link to={to} className={linkClasses} onClick={mobile ? toggleMobileNav : null}>
        {Icon && <span className={styles.iconWrapper}><Icon size={21} className={styles.icon}/></span>}
        <div className={styles.Label}>{label}</div>
        {releaseTag && <div className={styles.releaseTag}>{releaseTag}</div>}
      </Link>
    </li>
  );
}

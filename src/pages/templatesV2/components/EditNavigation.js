import React from 'react';
import classNames from 'classnames';
import { UnstyledLink } from '@sparkpost/matchbox';
import links from '../constants/editNavigationLinks';
import useEditorContext from '../hooks/useEditorContext';
import styles from './EditNavigation.module.scss';

const EditNavigation = ({ primaryArea }) => {
  const { currentNavigationKey, setNavigation } = useEditorContext();

  return (
    <div className={styles.Navigation}>
      <div className={styles.NavigationLinks}>
        {links.map(({ key, content }) => (
          <UnstyledLink
            className={classNames(styles.NavigationLink, {
              [styles.NavigationActiveLink]: key === currentNavigationKey
            })}
            key={key}
            onClick={() => { setNavigation(key); }}
          >
            {content}
          </UnstyledLink>
        ))}
      </div>
      <div className={styles.NavigationPrimaryArea}>
        {primaryArea}
      </div>
    </div>
  );
};

export default EditNavigation;

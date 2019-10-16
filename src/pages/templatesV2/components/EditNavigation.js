import React from 'react';
import classNames from 'classnames';
import { UnstyledLink } from '@sparkpost/matchbox';
import links from '../constants/editNavigationLinks';
import SavedIndicator from './SavedIndicator';
import useEditorContext from '../hooks/useEditorContext';
import styles from './EditNavigation.module.scss';

const EditNavigation = ({ primaryArea }) => {
  const {
    currentNavigationKey,
    setNavigation,
    hasSaved
  } = useEditorContext();

  return (
    <nav className={styles.Navigation}>
      <div className={styles.NavigationLinks}>
        {links.map(({ key, content }) => (
          <UnstyledLink
            className={classNames(styles.NavigationLink, {
              [styles.active]: key === currentNavigationKey
            })}
            key={key}
            onClick={() => { setNavigation(key); }}
            to="javascript:void(0)"
            role="button"
          >
            {content}
          </UnstyledLink>
        ))}
      </div>
      <div className={styles.NavigationPrimaryArea}>
        <SavedIndicator hasSaved={hasSaved}/>

        {primaryArea}
      </div>
    </nav>
  );
};

export default EditNavigation;

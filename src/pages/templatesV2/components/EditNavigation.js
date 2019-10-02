import React from 'react';
import classNames from 'classnames';
import { UnstyledLink, ScreenReaderOnly } from '@sparkpost/matchbox';
import links from '../constants/editNavigationLinks';
import useEditorContext from '../hooks/useEditorContext';
import styles from './EditNavigation.module.scss';

const EditNavigation = ({ primaryArea }) => {
  const {
    currentNavigationKey,
    setNavigation,
    hasSaved
  } = useEditorContext();

  const SavedIndicator = (props) => (
    <span className={styles.NavigationSavedIndicator}>
      <ScreenReaderOnly>Template</ScreenReaderOnly>

      <span>
        {props.content}
      </span>
    </span>
  );

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
        <SavedIndicator content={hasSaved ? 'Saved' : 'Unsaved Changes'}/>

        {primaryArea}
      </div>
    </nav>
  );
};

export default EditNavigation;

import React from 'react';
import classNames from 'classnames';
import { UnstyledLink } from 'src/components/matchbox';
import links from '../constants/editNavigationLinks';
import SavedIndicator from './SavedIndicator';
import useEditorContext from '../hooks/useEditorContext';
import useHibanaOverride from 'src/hooks/useHibanaOverride';
import OGStyles from './EditNavigation.module.scss';
import hibanaStyles from './EditNavigationHibana.module.scss';

const EditNavigation = ({ primaryArea }) => {
  const { currentNavigationKey, setNavigation, hasSaved } = useEditorContext();
  const styles = useHibanaOverride(OGStyles, hibanaStyles);

  return (
    <nav className={styles.Navigation} aria-label="Templates">
      <div className={styles.NavigationLinks}>
        {links.map(({ key, content }) => (
          <UnstyledLink
            className={classNames(styles.NavigationLink, {
              [styles.active]: key === currentNavigationKey,
            })}
            key={key}
            onClick={() => {
              setNavigation(key);
            }}
            to="javascript:void(0)"
            role="button"
            data-id={`subnav-link-${key}`}
          >
            {content}
          </UnstyledLink>
        ))}
      </div>
      <div className={styles.NavigationPrimaryArea}>
        <SavedIndicator hasSaved={hasSaved} />

        {primaryArea}
      </div>
    </nav>
  );
};

export default EditNavigation;

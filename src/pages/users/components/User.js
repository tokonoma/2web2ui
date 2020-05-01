import React, { Fragment } from 'react';
import { PageLink } from 'src/components/links';
import { OGOnlyWrapper } from 'src/components/hibana';
import useHibanaOverride from 'src/hooks/useHibanaOverride';
import OGStyles from './User.module.scss';
import hibanaStyles from './UserHibana.module.scss';

const User = ({ email, name, username }) => {
  const styles = useHibanaOverride(OGStyles, hibanaStyles);

  return (
    <Fragment>
      <div className={styles.Name}>
        <PageLink to={`/account/users/edit/${username}`}>
          <OGOnlyWrapper as="strong">{name}</OGOnlyWrapper>
        </PageLink>
      </div>

      <div className={styles.Email}>
        <OGOnlyWrapper as="em">{email}</OGOnlyWrapper>
      </div>
    </Fragment>
  );
};

export default User;

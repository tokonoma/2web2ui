import React, { Fragment } from 'react';
import { PageLink } from 'src/components/links';
import styles from './User.module.scss';

const User = ({ email, name, username }) => (
  <Fragment>
    <p className={styles.Name}>
      <PageLink to={`/account/users/edit/${username}`}>
        <strong>{name}</strong>
      </PageLink>
    </p>
    <p className={styles.Email}>
      <em>{email}</em>
    </p>
  </Fragment>
);

export default User;

import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Tag, Tooltip } from '@sparkpost/matchbox';
import { CheckCircle, Delete, Edit } from '@sparkpost/matchbox-icons';
import { formatDateTime } from 'src/helpers/date';
import { setSubaccountQuery } from 'src/helpers/subaccounts';
import { resolveTemplateStatus } from 'src/helpers/templates';
import styles from './ListComponents.module.scss';

import constants from '../constants';

export const Name = ({ name, id, subaccount_id, ...rowData }) => {
  const { published } = resolveTemplateStatus(rowData);
  return (
    <>
      <p className={styles.Name}>
        <Link
          to={`/${constants.routeNamespace}/edit/${id}${published ? '/published' : ''}${setSubaccountQuery(subaccount_id)}`}>
          <strong>{name}</strong>
        </Link>
      </p>
    </>
  );
};

export const Status = (rowData) => {
  const { published, publishedWithChanges } = resolveTemplateStatus(rowData);

  const PublishedIcon = <CheckCircle color='#45D09E'/>;

  if (published) {
    return <Tag>{PublishedIcon} Published</Tag>;
  }

  if (publishedWithChanges) {
    return (
      <Tooltip dark content='Contains unpublished changes'>
        <Tag className={styles.PublishedWithChanges}>
          {PublishedIcon} Published
        </Tag>
      </Tooltip>
    );
  }

  return <Tag><Edit/> Draft</Tag>;
};

export const Action = ({ id, subaccount_id, ...rowData }) => (
  <Button flat><Delete size={20}/></Button>
);

export const LastUpdated = ({ last_update_time }) => <p
  className={styles.LastUpdated}>{formatDateTime(last_update_time)}</p>;

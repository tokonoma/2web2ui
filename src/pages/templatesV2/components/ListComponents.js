import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Tag, Tooltip } from '@sparkpost/matchbox';
import { CheckCircle, Delete, Edit } from '@sparkpost/matchbox-icons';
import { formatDateTime } from 'src/helpers/date';
import { setSubaccountQuery } from 'src/helpers/subaccounts';
import styles from './ListComponents.module.scss';

import { routeNamespace } from '../constants';

export const Name = ({ name, id, subaccount_id, ...rowData }) => {
  const isDraft = rowData.list_status === 'draft';

  return (
    <>
      <p className={styles.Name}>
        <Link
          to={`/${routeNamespace}/edit/${id}${isDraft ? '' : '/published'}${setSubaccountQuery(subaccount_id)}`}>
          <strong>{name}</strong>
        </Link>
      </p>
    </>
  );
};

export const Status = (rowData) => {
  const listStatus = rowData.list_status;

  const PublishedIcon = <CheckCircle color='#45D09E'/>;

  if (listStatus === 'published') {
    return <Tag>{PublishedIcon} Published</Tag>;
  }

  if (listStatus === 'published_with_draft') {
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

export const Action = ({ onClick, ...props }) => <Button flat onClick={() => onClick(props)}><Delete
  size={20}/></Button>;

export const LastUpdated = ({ last_update_time }) => <p
  className={styles.LastUpdated}>{formatDateTime(last_update_time)}</p>;

import React from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Tag,
  Tooltip,
  ScreenReaderOnly
} from '@sparkpost/matchbox';
import {
  CheckCircle,
  Delete,
  Edit,
  ContentCopy
} from '@sparkpost/matchbox-icons';
import { formatDateTime } from 'src/helpers/date';
import { setSubaccountQuery } from 'src/helpers/subaccounts';
import styles from './ListComponents.module.scss';

import { routeNamespace } from '../constants/routes';

export const Name = ({ list_name: name, id, subaccount_id, ...rowData }) => {
  const version = rowData.list_status === 'draft' ? 'draft' : 'published';

  return (
    <>
      <p className={styles.Name}>
        <Link
          to={`/${routeNamespace}/edit/${id}/${version}/content${setSubaccountQuery(subaccount_id)}`}>
          <strong>{name}</strong>
        </Link>
      </p>
    </>
  );
};

export const Status = (rowData) => {
  const listStatus = rowData.list_status;

  const PublishedIcon = <CheckCircle className={styles.PublishedIconColor}/>;

  if (listStatus === 'published') {
    return <Tag className={styles.published}>{PublishedIcon} Published</Tag>;
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

export const DeleteAction = ({ onClick, ...props }) => (
  <Button
    className={styles.Action}
    flat
    onClick={() => onClick(props)}
  >
    <Delete size={16}/>

    <ScreenReaderOnly>Delete Template</ScreenReaderOnly>
  </Button>
);

export const DuplicateAction = ({ onClick, ...props }) => (
  <Button
    className={styles.Action}
    flat
    onClick={() => onClick(props)}
  >
    <ContentCopy size={16}/>

    <ScreenReaderOnly>Duplicate Template</ScreenReaderOnly>
  </Button>
);

export const LastUpdated = ({ last_update_time }) => <p
  className={styles.LastUpdated}>{formatDateTime(last_update_time)}</p>;

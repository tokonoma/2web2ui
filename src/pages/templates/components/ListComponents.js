import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Popover, Button, ActionList, Tag, Tooltip } from '@sparkpost/matchbox';
import { MoreHoriz } from '@sparkpost/matchbox-icons';
import { Subaccount as SubaccountTag } from 'src/components';
import { formatDateTime } from 'src/helpers/date';
import { setSubaccountQuery } from 'src/helpers/subaccounts';
import { resolveTemplateStatus } from 'src/helpers/templates';
import styles from './ListComponents.module.scss';

export const Name = ({ name, id, subaccount_id, ...rowData }) => {
  const { published } = resolveTemplateStatus(rowData);
  return (
    <Fragment>
      <p className={styles.Name}>
        <Link to={`/templates/edit/${id}${published ? '/published' : ''}${setSubaccountQuery(subaccount_id)}`}>
          <strong>{name}</strong>
        </Link>
      </p>
      <p className={styles.Id}><em>ID: {id}</em></p>
    </Fragment>
  );
};

export const Status = (rowData) => {
  const { published, publishedWithChanges } = resolveTemplateStatus(rowData);

  if (published) {
    return <Tag color='blue'>Published</Tag>;
  }

  if (publishedWithChanges) {
    return (
      <Tooltip dark content='Contains unpublished changes'>
        <Tag className={styles.PublishedWithChanges} color='blue'>
          &bull; Published
        </Tag>
      </Tooltip>
    );
  }

  return <Tag>Draft</Tag>;
};

export const Actions = ({ id, subaccount_id, ...rowData }) => {
  const { published, publishedWithChanges, draft } = resolveTemplateStatus(rowData);

  const actions = [
    {
      content: publishedWithChanges ? 'Edit Saved Draft' : 'Edit',
      to: `/templates/edit/${id}${setSubaccountQuery(subaccount_id)}`,
      component: Link
    },
    {
      // Preview Draft
      content: publishedWithChanges ? 'Preview Saved Draft' : 'Preview',
      to: `/templates/preview/${id}${setSubaccountQuery(subaccount_id)}`,
      component: Link,
      visible: publishedWithChanges || draft
    },
    {
      // Preview Published
      content: publishedWithChanges ? 'Preview Published' : 'Preview',
      to: `/templates/preview/${id}/published${setSubaccountQuery(subaccount_id)}`,
      component: Link,
      visible: publishedWithChanges || published
    }
  ];

  return (
    <div style={{ textAlign: 'right' }}>
      <Popover left trigger={<Button flat><MoreHoriz size={20}/></Button>}>
        <ActionList actions={actions}/>
      </Popover>
    </div>
  );
};

export const LastUpdated = ({ last_update_time }) => <p className={styles.LastUpdated}>{formatDateTime(last_update_time)}</p>;

export const Subaccount = ({ shared_with_subaccounts, subaccount_id, subaccount_name }) => (
  <SubaccountTag all={shared_with_subaccounts} id={subaccount_id} name={subaccount_name} />
);

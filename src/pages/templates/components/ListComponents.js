import React from 'react';
import classNames from 'classnames';
import { CheckCircle, Delete, Edit, ContentCopy } from '@sparkpost/matchbox-icons';
import { formatDateTime } from 'src/helpers/date';
import { setSubaccountQuery } from 'src/helpers/subaccounts';
import useHibanaOverride from 'src/hooks/useHibanaOverride';
import useUniqueId from 'src/hooks/useUniqueId';
import { PageLink } from 'src/components/links';
import { Button, ScreenReaderOnly, Tag, Text, Tooltip } from 'src/components/matchbox';
import OGStyles from './ListComponents.module.scss';
import hibanaStyles from './ListComponentsHibana.module.scss';
import { routeNamespace } from '../constants/routes';

export const Name = ({ list_name: name, id, subaccount_id, ...rowData }) => {
  const version = rowData.list_status === 'draft' ? 'draft' : 'published';

  return (
    <>
      {/* TODO: Remove <strong> when OG theme is removed */}
      <strong>
        <Text as="span" fontWeight="400">
          <PageLink
            to={`/${routeNamespace}/edit/${id}/${version}/content${setSubaccountQuery(
              subaccount_id,
            )}`}
          >
            {name}
          </PageLink>
        </Text>
      </strong>
    </>
  );
};

export const Status = rowData => {
  const styles = useHibanaOverride(OGStyles, hibanaStyles);
  const id = useUniqueId('templates-status');
  const { list_status } = rowData;
  const PublishedIcon = <CheckCircle className={styles.PublishedIconColor} />;

  if (list_status === 'published') {
    return (
      <Tag className={styles.published}>
        {PublishedIcon}&nbsp;<span>Published</span>
      </Tag>
    );
  }

  if (list_status === 'published_with_draft') {
    return (
      <Tooltip id={id} dark content="Contains unpublished changes">
        <Tag className={styles.PublishedWithChanges}>
          {PublishedIcon}&nbsp;<span>Published</span>
        </Tag>
      </Tooltip>
    );
  }

  return (
    <Tag>
      <Edit />
      &nbsp;<span>Draft</span>
    </Tag>
  );
};

export const DeleteAction = ({ onClick, className, ...props }) => {
  const styles = useHibanaOverride(OGStyles, hibanaStyles);

  return (
    <Button
      {...props}
      className={classNames(styles.Action, className)}
      flat
      onClick={() => onClick(props)}
    >
      <Delete size={16} />

      <ScreenReaderOnly>Delete Template</ScreenReaderOnly>
    </Button>
  );
};

export const DuplicateAction = ({ onClick, className, ...props }) => {
  const styles = useHibanaOverride(OGStyles, hibanaStyles);

  return (
    <Button
      {...props}
      className={classNames(styles.Action, className)}
      flat
      onClick={() => onClick(props)}
    >
      <ContentCopy size={16} />

      <ScreenReaderOnly>Duplicate Template</ScreenReaderOnly>
    </Button>
  );
};

export const LastUpdated = ({ last_update_time }) => {
  const styles = useHibanaOverride(OGStyles, hibanaStyles);

  return <p className={styles.LastUpdated}>{formatDateTime(last_update_time)}</p>;
};

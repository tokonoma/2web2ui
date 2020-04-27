import React from 'react';
import classNames from 'classnames';
import { Error, CheckCircle, Cached, CloudUpload } from '@sparkpost/matchbox-icons';
import { Tag } from 'src/components/matchbox';

import useHibanaOverride from 'src/hooks/useHibanaOverride';
import OGStyles from './JobStatusTag.module.scss';
import hibanaStyles from './JobStatusTagHibana.module.scss';

function getStatusProps(styles) {
  return {
    error: {
      className: styles.Failed,
      icon: Error,
      message: 'Validation Error',
    },
    usage_limit_exceeded: {
      className: styles.Failed,
      icon: Error,
      message: 'Validation Error',
    },
    success: {
      className: styles.Complete,
      icon: CheckCircle,
      message: 'Complete',
    },
    queued_for_batch: {
      className: styles.Ready,
      icon: CloudUpload,
      message: 'Ready to validate',
    },
    loading: {
      className: styles.Loading,
      icon: Cached,
      message: 'Processing',
    },
  };
}

const JobStatusTag = ({ status }) => {
  const styles = useHibanaOverride(OGStyles, hibanaStyles);
  const statusProps = getStatusProps(styles);
  const { className, icon: Icon, message } = statusProps[status] || statusProps.loading;

  return (
    <Tag style={{ verticalAlign: 'bottom' }}>
      <span className={classNames(styles.JobStatusTagContent, className)}>
        <Icon />
        &nbsp;
      </span>
      <span>{message}</span>
    </Tag>
  );
};

export default JobStatusTag;

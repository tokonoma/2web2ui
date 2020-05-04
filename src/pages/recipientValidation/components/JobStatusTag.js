import React from 'react';
import classNames from 'classnames';
import { useHibana } from 'src/context/HibanaContext';
import { Error, CheckCircle, Cached, CloudUpload } from '@sparkpost/matchbox-icons';
import { Tag } from 'src/components/matchbox';

import useHibanaOverride from 'src/hooks/useHibanaOverride';
import OGStyles from './JobStatusTag.module.scss';
import hibanaStyles from './JobStatusTagHibana.module.scss';

function getStatusProps(styles) {
  return {
    error: {
      tagColor: 'red',
      className: styles.Failed,
      icon: Error,
      message: 'Validation Error',
    },
    usage_limit_exceeded: {
      tagColor: 'red',
      className: styles.Failed,
      icon: Error,
      message: 'Validation Error',
    },
    success: {
      tagColor: 'green',
      className: styles.Complete,
      icon: CheckCircle,
      message: 'Complete',
    },
    queued_for_batch: {
      tagColor: '',
      className: styles.Ready,
      icon: CloudUpload,
      message: 'Ready to validate',
    },
    loading: {
      tagColor: '',
      className: styles.Loading,
      icon: Cached,
      message: 'Processing',
    },
  };
}

const JobStatusTag = ({ status }) => {
  const [state] = useHibana();
  const { isHibanaEnabled } = state;
  const styles = useHibanaOverride(OGStyles, hibanaStyles);
  const statusProps = getStatusProps(styles);
  const { tagColor, className, icon: Icon, message } = statusProps[status] || statusProps.loading;

  return (
    <Tag color={isHibanaEnabled ? tagColor : ''} style={{ verticalAlign: 'bottom' }}>
      <span className={classNames(styles.JobStatusTagContent, className)}>
        {!isHibanaEnabled && <Icon />}
        &nbsp;
      </span>
      <span>{message}</span>
    </Tag>
  );
};

export default JobStatusTag;

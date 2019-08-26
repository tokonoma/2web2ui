import React from 'react';
import { Tag } from '@sparkpost/matchbox';
import { Error, CheckCircle, Cached, CloudUpload } from '@sparkpost/matchbox-icons';
import styles from './JobStatusTag.module.scss';


const statusProps = {
  error: {
    className: styles.Failed,
    icon: Error,
    message: 'Failed. Please try again.'
  },
  success: {
    className: styles.Complete,
    icon: CheckCircle,
    message: 'Completed'
  },
  queued_for_batch: {
    className: styles.Ready,
    icon: CloudUpload,
    message: 'Ready to validate'
  },
  loading: {
    className: styles.Loading,
    icon: Cached,
    message: 'Processing'
  }
};

const JobStatusTag = ({ status }) => {
  const { className, icon: Icon, message } = statusProps[status] || statusProps.loading;

  return (
    <Tag>
      <span className={className}>
        <Icon />&nbsp;
      </span>
      <span>{message}</span>
    </Tag>
  );
};

export default JobStatusTag;

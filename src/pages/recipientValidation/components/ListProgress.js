import React from 'react';
import { connect } from 'react-redux';
import { Button, UnstyledLink } from '@sparkpost/matchbox';
import { getJobStatus } from 'src/actions/recipientValidation';
import FocusContainer from 'src/components/focusContainer';
import PageLink from 'src/components/pageLink';
import { PollContext } from 'src/context/Poll';
import withContext from 'src/context/withContext';
import { lerp } from 'src/helpers/math';
import { showAlert } from 'src/actions/globalAlert';
import JobStatusTag from './JobStatusTag';
import styles from './ListProgress.module.scss';

const BATCH_STATUS = [
  'batch_triggered',
  'reading_upload_file',
  'checking_regex',
  'performing_mx_lookup',
  'performing_decay_scoring',
  'performing_role_based_lookup',
  'performing_disposable_domain',
  'performing_free_email',
  'performing_did_you_mean',
  'uploading_results_to_s3',
  'success',
];

export const ListProgress = ({
  getJobStatus,
  job: { filename, jobId, status },
  showAlert,
  startPolling,
  stopPolling,
}) => {
  const percentage =
    BATCH_STATUS.findIndex(batchStatus => batchStatus === status) / (BATCH_STATUS.length - 1);
  const formattedPercentage = lerp(0, 100, percentage);

  React.useEffect(() => {
    startPolling({
      key: jobId,
      action: () =>
        getJobStatus(jobId)
          .then(({ batch_status }) => {
            // This needs to live on after this component is unmounted
            if (
              batch_status === 'usage_limit_exceeded' ||
              batch_status === 'error' ||
              batch_status === 'success'
            ) {
              showAlert({
                type: batch_status === 'success' ? 'success' : 'error',
                message:
                  batch_status === 'usage_limit_exceeded'
                    ? 'Usage limit exceeded'
                    : `Validation of ${filename} recipient list has completed`,
                dedupeId: jobId,
                details:
                  batch_status === 'usage_limit_exceeded' ? (
                    <UnstyledLink external to="https://sparkpost.com/sales">
                      Contact sales
                    </UnstyledLink>
                  ) : (
                    undefined
                  ),
              });

              stopPolling(jobId);
            }
          })
          .catch(() => {
            stopPolling(jobId);
          }),
      interval: 5000,
    });
  }, [filename, getJobStatus, jobId, showAlert, startPolling, stopPolling]);

  return (
    <FocusContainer className={styles.ListProgressContainer}>
      <h2>{filename}</h2>
      <p>
        <span>
          Your list is validating. You can track its progress on the recipient validation{' '}
        </span>
        <PageLink to="/recipient-validation">home page</PageLink>,
        <span> we'll let you know when validation is complete and your results are ready.</span>
      </p>
      <div className={styles.ListProgress}>
        <div className={styles.ListProgressStatus}>
          <strong>Status:</strong>&nbsp;
          <JobStatusTag status={status} />
        </div>
        {status !== 'error' && (
          <div className={styles.ProgressBar}>
            <div className={styles.Progress} style={{ width: `${formattedPercentage}%` }} />
          </div>
        )}
      </div>
      <Button color="orange" component={PageLink} to="/recipient-validation">
        Validate Another
      </Button>
    </FocusContainer>
  );
};

export default connect(undefined, { getJobStatus, showAlert })(
  withContext(PollContext, ListProgress),
);

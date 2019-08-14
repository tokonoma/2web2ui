import React from 'react';
import { Button } from '@sparkpost/matchbox';
import { Link } from 'react-router-dom';
import styles from './ListProgress.module.scss';
import { UnstyledLink } from '@sparkpost/matchbox';
import { lerp } from 'src/helpers/math';

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
  'uploading_results_to_s3'
];

const ProgressBar = ({ completed }) => (
  <div className={styles.ProgressBar} >
    <div className={styles.Progress} style={{ width: `${completed}%` }}/>
  </div>
);

const ListProgress = ({ job }) => {

  const { status, filename, complete } = job;

  const percentage = complete ? 100 : lerp(0, 100, BATCH_STATUS.findIndex((batchStep) => batchStep === status) / BATCH_STATUS.length);

  return (
    <div style={{ width: '80%', margin: '20px' }}>
      <h2>{filename}</h2>
      <div style={{ marginBottom: 80 }}>
        <span>Your list is validating. You can track its progress on the recipient validation </span>
        <UnstyledLink to='/recipient-validation' component={Link}>home page</UnstyledLink>,
        <span> we'll let you know when validation is complete and your results are ready.</span>
      </div>
      <div><strong>Status:</strong> Processing</div>
      <ProgressBar style={{ marginBottom: '400px' }} completed={percentage}/>
      <Button color='orange' component={Link} to='/recipient-validation'>Validate Another</Button>
    </div>
  );
};

export default ListProgress;

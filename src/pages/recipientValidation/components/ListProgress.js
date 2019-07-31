import React, { Component } from 'react';
import { ProgressBar, Button } from '@sparkpost/matchbox';
import { Link } from 'react-router-dom';

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

class ListProgress extends Component {

  render() {
    const { status = 'checking_regex', fileName = 'Big_file.csv' } = this.props;

    const percentage = 100 * BATCH_STATUS.findIndex((batchStep) => batchStep === status) / BATCH_STATUS.length;
    return (
      <div style={{ width: '80%', margin: '20px' }}>
        <h2>{fileName}</h2>
        <div style={{ marginBottom: 80 }}>Your list is validating. You can track its progress on the recipient validation home page,
        we'll let you know when validatioin is complete and your results are ready.</div>
        <ProgressBar completed={percentage}/>
        <Button color='orange' component={Link} to='/recipient-validation'>Validate Another</Button>
      </div>
    );
  }
}

export default ListProgress;

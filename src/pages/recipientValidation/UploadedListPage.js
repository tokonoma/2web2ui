import React, { Component } from 'react';
import { Page, Panel } from '@sparkpost/matchbox';
import { Link, withRouter } from 'react-router-dom';
import UploadedListForm from './components/UploadedListForm';
import ListProgress from './components/ListProgress';
import { formatDate, formatTime } from 'src/helpers/date';
import { connect } from 'react-redux';
import { showAlert } from 'src/actions/globalAlert';
import { getJobStatusMock, triggerJob } from 'src/actions/recipientValidation';
import { getUsage } from 'src/actions/account';
import _ from 'lodash';
import Loading from 'src/components/loading';
import styles from './UploadedListPage.module.scss';
import { PollContext } from 'src/context/Poll';
import withContext from 'src/context/withContext';
import { selectRecipientValidationJobById } from 'src/selectors/recipientValidation';

export class UploadedListPage extends Component {

  componentDidMount() {
    const { getJobStatusMock, getUsage, listId, history, startPolling } = this.props;
    // TODO: Replace action with real action (and update test)
    getJobStatusMock(listId).then(({ batch_status, complete }) => {
      if (batch_status !== 'queued_for_batch' && !complete) {
        startPolling({
          key: listId,
          action: () => this.handlePoll(listId),
          interval: 5000
        });
      }
    }, () => {
      history.replace('/recipient-validation/list');
    });
    getUsage();
  }

  handleSubmit = () => {
    const { triggerJob, listId, startPolling } = this.props;
    triggerJob(listId).then(() => {
      startPolling({
        key: listId,
        action: () => this.handlePoll(listId),
        interval: 5000
      });
    });
  }

  handlePoll = (id) => {
    const { showAlert, getJobStatusMock, stopPolling } = this.props;
    //TODO: replace action with real action
    return getJobStatusMock(id).then(({ complete, batch_status }) => {
      if (batch_status === 'queued_for_batch') {
        stopPolling(id);
      }

      if (batch_status.toLowerCase() === 'error') {
        stopPolling(id);
        showAlert({
          type: 'error',
          message: 'Recipient Validation Failed. Please Try Again.',
          dedupeId: id
        });
      }

      if (complete && batch_status.toLowerCase() === 'success') {
        stopPolling(id);
        showAlert({
          type: 'success',
          message: 'Recipient Validation Results Ready',
          dedupeId: id
        });
      }
    });
  }

  render() {
    const { job, currentUsage, loading } = this.props;

    if (!job || loading) {
      return (<Loading />);
    }

    const volumeUsed = _.get(currentUsage, 'recipient_validation.month.used', 0);

    return (
      <Page
        title='Recipient Validation'
        breadcrumbAction={{ content: 'Back', component: Link, to: '/recipient-validation/list' }}
      >
        <Panel>
          <Panel.Section>
            <div className={styles.dateHeader}>
              <strong>{formatDate(job.updatedAt)}</strong>
              <span> at </span>
              <strong>{formatTime(job.updatedAt)}</strong>
            </div>
          </Panel.Section>
          <Panel.Section>
            {job.status === 'queued_for_batch' ? (
              <UploadedListForm
                onSubmit={this.handleSubmit}
                job={job}
                currentUsage={volumeUsed}
              />
            ) : (
              <ListProgress job={job} />
            )}
          </Panel.Section>
        </Panel>
      </Page>
    );
  }
}

const mapStateToProps = (state, props) => {
  const { listId } = props.match.params;

  return {
    currentUsage: state.account.rvUsage,
    listId,
    job: selectRecipientValidationJobById(state, listId),
    loading: state.recipientValidation.jobResultsLoading || state.account.usageLoading
  };
};

export default withRouter(connect(mapStateToProps, { showAlert, getJobStatusMock, getUsage, triggerJob })(withContext(PollContext, UploadedListPage)));

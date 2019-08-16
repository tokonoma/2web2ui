import React, { Component } from 'react';
import { connect } from 'react-redux';
import { showAlert } from 'src/actions/globalAlert';
import { PollContext } from 'src/context/Poll';
import withContext from 'src/context/withContext';

import ListResultsCard from './ListResultsCard';
import { getLatestJob, getJobStatus } from 'src/actions/recipientValidation';
import _ from 'lodash';

export class ListResults extends Component {

  componentDidMount() {
    this.props.getLatestJob();
  }

  componentDidUpdate({ latestId: prevLatestId }) {
    const { latestId, results, startPolling, stopPolling } = this.props;

    // Start polling when a new list ID is recieved, which changes when either:
    // - Upload view first mounts
    // - Form is resubmitted
    if (prevLatestId !== latestId) {
      stopPolling(prevLatestId); // Stop any previous polling instances

      if (!results.complete) {
        this.handlePoll(latestId);
        startPolling({
          key: latestId,
          action: () => this.handlePoll(latestId),
          interval: 5000
        });
      }
    }
  }

  handlePoll = (id) => {
    const { showAlert, getJobStatus, stopPolling } = this.props;
    return getJobStatus(id).then(({ complete, batch_status }) => {
      const normalizedStatus = batch_status.toLowerCase();

      if (normalizedStatus === 'error') {
        stopPolling(id);
        showAlert({
          type: 'error',
          message: 'Recipient Validation Failed. Please Try Again.',
          dedupeId: id
        });
      }

      if (complete && normalizedStatus === 'success') {
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
    const { results, loading } = this.props;

    if (!loading && _.isEmpty(results)) {
      return null;
    }

    return (
      <ListResultsCard {...results} />
    );
  }
}


const mapStateToProps = ({ recipientValidation }) => {
  const latestId = recipientValidation.latest;

  return {
    latestId,
    results: recipientValidation.jobResults[latestId] || {},
    loading: recipientValidation.jobResultsLoading
  };
};

export default connect(mapStateToProps, { getLatestJob, getJobStatus, showAlert })(withContext(PollContext, ListResults));

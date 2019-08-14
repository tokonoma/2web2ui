import React, { Component } from 'react';
import { connect } from 'react-redux';
import { showAlert } from 'src/actions/globalAlert';
import { PollContext } from 'src/context/Poll';
import withContext from 'src/context/withContext';

import ListResultsCard from './ListResultsCard';
import { isAccountUiOptionSet } from 'src/helpers/conditions/account';
import { getLatestJob, getJobStatus, getList } from 'src/actions/recipientValidation';
import _ from 'lodash';

export class ListResults extends Component {

  componentDidMount() {
    const { getLatestJob, getList, newListUpload } = this.props;
    //TODO: Remove getLatestJob and replace with getList
    if (newListUpload) {
      getList();
    } else {
      getLatestJob();
    }
  }

  componentDidUpdate({ latestId: prevLatestId }) {
    const { latestId, results, startPolling, stopPolling, newListUpload } = this.props;

    if (newListUpload) {
      return;
    }
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
      if (batch_status === 'error') {
        stopPolling(id);
        showAlert({
          type: 'error',
          message: 'Recipient Validation Failed. Please Try Again.',
          dedupeId: id
        });
      }

      if (complete && batch_status === 'success') {
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
    const { resultsList, loading, newListUpload } = this.props;

    if (!loading && _.isEmpty(resultsList)) {
      return null;
    }

    return (
      <ListResultsCard results={resultsList} newListUpload={newListUpload} />
    );
  }
}


const mapStateToProps = (state) => {
  const { recipientValidation } = state;
  const latestId = recipientValidation.latest;

  return {
    latestId, //TODO: remove
    results: recipientValidation.jobResults[latestId] || {}, //TODO: Replace with list
    loading: recipientValidation.jobResultsLoading,
    resultsList: recipientValidation.jobResults || {},
    newListUpload: isAccountUiOptionSet('recipientValidationV2')(state)
  };
};

export default connect(mapStateToProps, { getLatestJob, getJobStatus, showAlert, getList })(withContext(PollContext, ListResults));

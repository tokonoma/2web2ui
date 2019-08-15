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
      startPolling({
        key: 'poll-list',
        action: () => this.handleListPoll(),
        interval: 10000
      });
    } else {
      //TODO: Remove once list takes over
      // Start polling when a new list ID is recieved, which changes when either:
      // - Upload view first mounts
      // - Form is resubmitted
      if (prevLatestId !== latestId) {
        stopPolling(prevLatestId); // Stop any previous polling instances

        if (!results[latestId].complete) {
          this.handlePoll(latestId);
          startPolling({
            key: latestId,
            action: () => this.handlePoll(latestId),
            interval: 5000
          });
        }
      }
    }
  }

  componentWillUnmount() {
    const { stopPolling } = this.props;
    stopPolling('poll-list');
  }

  //TODO: Remove once list takes over
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

  handleListPoll = () => {
    const { getList } = this.props;
    return getList();
    //TODO: Check if all items are complete, then stop polling
  }


  render() {
    const { results, loading, newListUpload } = this.props;

    if (!loading && _.isEmpty(results)) {
      return null;
    }

    return (
      <ListResultsCard results={results} newListUpload={newListUpload} />
    );
  }
}


const mapStateToProps = (state) => {
  const { recipientValidation } = state;
  const latestId = recipientValidation.latest;

  return {
    latestId,
    results: recipientValidation.jobResults || {},
    loading: recipientValidation.jobResultsLoading,
    newListUpload: isAccountUiOptionSet('recipientValidationV2')(state) //TODO: Remove in SE-156
  };
};

export default connect(mapStateToProps, { getLatestJob, getJobStatus, showAlert, getList })(withContext(PollContext, ListResults));

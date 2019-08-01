import React, { Component } from 'react';
import { Page, Panel } from '@sparkpost/matchbox';
import { Link, withRouter } from 'react-router-dom';
import UploadedListForm from './components/UploadedListForm';
import { formatDate, formatTime } from 'src/helpers/date';
import { connect } from 'react-redux';
import { showAlert } from 'src/actions/globalAlert';
import { getJobStatusMock } from 'src/actions/recipientValidation';
import { getUsage } from 'src/actions/account';
import _ from 'lodash';
import Loading from 'src/components/loading';

export class UploadedListPage extends Component {

  componentDidMount() {
    const { getJobStatusMock, getUsage } = this.props;
    // TODO: Use action
    getJobStatusMock();
    // TODO: Get usage
    getUsage();

  }


  renderTitle = (date = Date.now()) => ( //TODO: Remove pre-rendered date
    <div style={{ fontSize: '1rem', fontWeight: 200 }}>
      <strong>{formatDate(date)}</strong>
      <span> at </span>
      <strong>{formatTime(date)}</strong>
    </div>
  )

  handleSubmit = () => {
    const { showAlert } = this.props;
    //TODO: Replace with job trigger
    showAlert({ message: 'Oh yeah' });
  }

  render() {
    const { results, currentUsage, loading } = this.props;

    if (loading) {
      return (<Loading />);
    }
    const { status, address_count } = results;
    const volumeUsed = _.get(currentUsage, 'recipient_validation.month.used', 0);

    return (
      <Page title='Recipient Validation' breadcrumbAction={{ content: 'Back', component: Link, to: '/recipient-validation/list' }}>
        <Panel>
          <Panel.Section>
            {this.renderTitle()}
          </Panel.Section>
          <Panel.Section>
            {status === 'queued_for_batch'
              ? (<UploadedListForm
                onSubmit={this.handleSubmit}
                count={address_count}
                currentUsage={volumeUsed}

              />)
              : <div>List Results</div>
            }
          </Panel.Section>
        </Panel>
      </Page>
    );
  }
}

const mapStateToProps = ({ recipientValidation, account }, { match }) => {
  const { listId } = match.params;

  return {
    listId,
    results: recipientValidation.jobResults[listId] || {},
    currentUsage: account.rvUsage,
    loading: recipientValidation.jobResultsLoading || account.usageLoading
  };
};

export default withRouter(connect(mapStateToProps, { showAlert, getJobStatusMock, getUsage })(UploadedListPage));

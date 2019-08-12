import React, { Component } from 'react';
import { Page, Panel } from '@sparkpost/matchbox';
import { Link, withRouter } from 'react-router-dom';
import UploadedListForm from './components/UploadedListForm';
import { formatDate, formatTime } from 'src/helpers/date';
import { connect } from 'react-redux';
import { showAlert } from 'src/actions/globalAlert';
import { getJobStatus } from 'src/actions/recipientValidation';
import { getUsage } from 'src/actions/account';
import _ from 'lodash';
import Loading from 'src/components/loading';
import moment from 'moment';
import styles from './UploadedListPage.module.scss';

export class UploadedListPage extends Component {

  componentDidMount() {
    const { getJobStatus, getUsage, listId } = this.props;
    // TODO: Use action
    getJobStatus(listId);
    getUsage();
  }


  renderTitle = (date) => (
    <div className={styles.dateHeader}>
      <strong>{formatDate(moment.unix(date))}</strong>
      <span> at </span>
      <strong>{formatTime(moment.unix(date))}</strong>
    </div>
  )

  handleSubmit = () => {
    //TODO: Replace with job trigger
  }

  render() {
    const { results, currentUsage, loading } = this.props;

    if (loading) {
      return (<Loading />);
    }
    const { status, uploaded } = results;
    const volumeUsed = _.get(currentUsage, 'recipient_validation.month.used', 0);

    return (
      <Page title='Recipient Validation' breadcrumbAction={{ content: 'Back', component: Link, to: '/recipient-validation/list' }}>
        <Panel>
          <Panel.Section>
            {this.renderTitle(uploaded)}
          </Panel.Section>
          <Panel.Section>
            {status === 'queued_for_batch'
              ? (<UploadedListForm
                onSubmit={this.handleSubmit}
                job={results}
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

export default withRouter(connect(mapStateToProps, { showAlert, getJobStatus, getUsage })(UploadedListPage));

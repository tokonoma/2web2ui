import React, { Component } from 'react';
import { Page, Panel } from '@sparkpost/matchbox';
import { Link, withRouter } from 'react-router-dom';
import UploadedListForm from './components/UploadedListForm';
import { formatDate, formatTime } from 'src/helpers/date';
import { connect } from 'react-redux';
import { showAlert } from 'src/actions/globalAlert';
import { triggerJob, getJobStatus } from 'src/actions/recipientValidation';

class UploadedListPage extends Component {

  componentDidMount() {
    // TODO: if 404 on loading the list
    // history.replace('/recipient-validation');
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
    const { batch_status } = this.props;
    return (
      <Page title='Recipient Validation' breadcrumbAction={{ content: 'Back', component: Link, to: '/recipient-validation/list' }}>
        <Panel>
          <Panel.Section>
            {this.renderTitle()}
          </Panel.Section>
          <Panel.Section>
            {batch_status === 'queued_for_batch'
              ? <UploadedListForm
                onSubmit={this.handleSubmit}
              />
              : <div>List Results</div>
            }
          </Panel.Section>
        </Panel>
      </Page>
    );
  }
}

const mapStateToProps = (state, { match }) => ({
  batch_status: 'queued_for_batch', //TODO: Replace with status of job
  listId: match.params.listId
});

export default withRouter(connect(mapStateToProps, { showAlert, getJobStatus, triggerJob })(UploadedListPage));

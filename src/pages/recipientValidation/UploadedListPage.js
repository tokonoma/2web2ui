import React, { Component } from 'react';
import { Page, Panel } from '@sparkpost/matchbox';
import { connect } from 'react-redux';
import { formatDate, formatTime } from 'src/helpers/date';
import { getJobStatus, triggerJob } from 'src/actions/recipientValidation';
import Loading from 'src/components/loading';
import PageLink from 'src/components/pageLink/PageLink';
import { RedirectAndAlert } from 'src/components/globalAlert';
import { selectRecipientValidationJobById } from 'src/selectors/recipientValidation';
import ListProgress from './components/ListProgress';
import UploadedListForm from './components/UploadedListForm';
import styles from './UploadedListPage.module.scss';

export class UploadedListPage extends Component {
  componentDidMount() {
    const { getJobStatus, listId } = this.props;
    getJobStatus(listId);
  }

  handleSubmit = () => {
    const { listId, triggerJob } = this.props;
    triggerJob(listId);
  }

  render() {
    const { job, jobLoadingStatus, listId } = this.props;

    if (!job && jobLoadingStatus === 'fail') {
      return (
        <RedirectAndAlert
          alert={{
            message: `Unable to find list ${listId}`,
            type: 'error'
          }}
          to="/recipient-validation"
        />
      );
    }

    if (!job) {
      return <Loading />;
    }

    return (
      <Page
        title='Recipient Validation'
        breadcrumbAction={{ content: 'Back', component: PageLink, to: '/recipient-validation' }}
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
              <UploadedListForm job={job} onSubmit={this.handleSubmit} />
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
    listId,
    job: selectRecipientValidationJobById(state, listId),
    jobLoadingStatus: state.recipientValidation.jobLoadingStatus[listId]
  };
};

export default connect(mapStateToProps, { getJobStatus, triggerJob })(UploadedListPage);

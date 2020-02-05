import React, { Component } from 'react';
import { Page, Panel } from '@sparkpost/matchbox';
import { connect } from 'react-redux';
import { formatDate, formatTime } from 'src/helpers/date';
import { getJobStatus, triggerJob } from 'src/actions/recipientValidation';
import { getBillingInfo } from 'src/actions/account';
import Loading from 'src/components/loading';
import PageLink from 'src/components/pageLink/PageLink';
import { RedirectAndAlert } from 'src/components/globalAlert';
import { selectRecipientValidationJobById } from 'src/selectors/recipientValidation';
import ListError from './components/ListError';
import ListProgress from './components/ListProgress';
import UploadedListForm from './components/UploadedListForm';
import styles from './UploadedListPage.module.scss';
import { isAccountUiOptionSet } from 'src/helpers/conditions/account';
import ValidateSection from './components/ValidateSection';
import { FORMS } from 'src/constants';
import { reduxForm } from 'redux-form';
import _ from 'lodash';

const FORMNAME = FORMS.RV_ADDPAYMENTFORM;

export class UploadedListPage extends Component {
  componentDidMount() {
    const { getJobStatus, listId, getBillingInfo } = this.props;
    getJobStatus(listId);
    getBillingInfo();
  }

  handleSubmit = () => {
    const { listId, triggerJob } = this.props;
    triggerJob(listId);
  };

  onSubmit = () => {
    console.log('somewhere else');
  };

  render() {
    const {
      job,
      jobLoadingStatus,
      listId,
      isStandAloneRVSet,
      billing: { credit_card },
    } = this.props;

    const { valid, pristine, submitting, isRVFormPresent } = this.props;
    const submitDisabled = pristine || !valid || submitting;

    if (!job && jobLoadingStatus === 'fail') {
      return (
        <RedirectAndAlert
          alert={{
            message: `Unable to find list ${listId}`,
            type: 'error',
          }}
          to="/recipient-validation"
        />
      );
    }

    if (!job) {
      return <Loading />;
    }

    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
        <Page
          title="Recipient Validation"
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
              {job.status === 'queued_for_batch' && (
                <UploadedListForm job={job} onSubmit={this.handleSubmit} />
              )}

              {job.status === 'error' && <ListError />}

              {job.status !== 'queued_for_batch' && job.status !== 'error' && (
                <ListProgress job={job} />
              )}
            </Panel.Section>
          </Panel>
          {isStandAloneRVSet && (
            <ValidateSection
              credit_card={credit_card}
              formname={FORMNAME}
              submitDisabled={submitDisabled && isRVFormPresent}
            />
          )}
        </Page>
      </form>
    );
  }
}

const mapStateToProps = (state, props) => {
  const { listId } = props.match.params;

  return {
    listId,
    job: selectRecipientValidationJobById(state, listId),
    jobLoadingStatus: state.recipientValidation.jobLoadingStatus[listId],
    isStandAloneRVSet: isAccountUiOptionSet('standalone_rv')(state),
    billing: state.account.billing || {},
    isRVFormPresent: Boolean(state.form[FORMNAME]) && !_.isEmpty(state.form[FORMNAME]),
  };
};

export default connect(mapStateToProps, { getJobStatus, triggerJob, getBillingInfo })(
  UploadedListPage,
);

const formOptions = { form: FORMNAME, enableReinitialize: true };
export const UploadedListPageSRV = connect(mapStateToProps, {
  getJobStatus,
  triggerJob,
  getBillingInfo,
})(reduxForm(formOptions)(UploadedListPage));

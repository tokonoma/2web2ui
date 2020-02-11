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
import { isProductionOnSubscription } from 'src/helpers/billing';
import { rvAddPaymentFormInitialValues } from 'src/selectors/recipientValidation';
import { prepareCardInfo } from 'src/helpers/billing';
import addRVtoSubscription from 'src/actions/addRVtoSubscription';
import _ from 'lodash';

const FORMNAME = FORMS.RV_ADDPAYMENTFORM;

export class UploadedListPage extends Component {
  state = {
    useSavedCC: Boolean(this.props.billing.credit_card),
  };
  componentDidMount() {
    const { getJobStatus, listId, getBillingInfo } = this.props;
    getJobStatus(listId);
    getBillingInfo();
  }

  componentDidUpdate(prevProps) {
    if (this.props.billing !== prevProps.billing)
      this.setState({ useSavedCC: Boolean(this.props.billing.credit_card) });
  }

  handleToggleCC = val => this.setState({ useSavedCC: !val });

  handleSubmit = () => {
    const { listId, triggerJob } = this.props;
    triggerJob(listId);
  };

  onSubmit = values => {
    if (this.props.isStandAloneRVSet) {
      const {
        billing: { plans, subscription },
        isRVonSubscription,
      } = this.props;
      if (this.state.useSavedCC && isRVonSubscription) {
        this.handleSubmit();
      } else {
        const cardValues = values.card ? { ...values, card: prepareCardInfo(values.card) } : values;

        const newValues = {
          ...cardValues,
          billingId: subscription
            ? (_.find(plans, { code: subscription.code }) || {}).billingId
            : (_.find(plans, { product: 'recipient_validation' }) || {}).billingId,
        };
        let action = this.props.addRVtoSubscription(
          newValues,
          !this.state.useSavedCC,
          isRVonSubscription,
        );
        return action.then(() => this.handleSubmit());
      }
    } else {
      this.handleSubmit();
    }
  };

  renderUploadedListPage = () => {
    const {
      job,
      isStandAloneRVSet,
      billing: { credit_card },
    } = this.props;

    const { valid, pristine, submitting } = this.props;
    const submitDisabled = pristine || !valid || submitting;
    return (
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
        {isStandAloneRVSet && job.status === 'queued_for_batch' && (
          <ValidateSection
            credit_card={credit_card}
            formname={FORMNAME}
            submitDisabled={submitDisabled && !this.state.useSavedCC}
            handleCardToggle={this.handleToggleCC}
            defaultToggleState={!this.state.useSavedCC}
          />
        )}
      </Page>
    );
  };

  render() {
    const { job, jobLoadingStatus, listId, isStandAloneRVSet } = this.props;

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
    if (isStandAloneRVSet)
      return (
        <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          {this.renderUploadedListPage()}
        </form>
      );
    return this.renderUploadedListPage();
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
    isRVonSubscription: isProductionOnSubscription(state, 'recipient_validation'),
    initialValues: rvAddPaymentFormInitialValues(state),
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
  addRVtoSubscription,
})(reduxForm(formOptions)(UploadedListPage));

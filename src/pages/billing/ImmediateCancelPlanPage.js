import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApiErrorBanner, Loading, PageLink } from 'src/components';
import { cancelAccount } from 'src/actions/account';
import { showAlert } from 'src/actions/globalAlert';
import styles from './ImmediateChangePlanPage.module.scss';

const BILLING_ROUTE = '/account/billing';

export const LOAD_STATE = {
  PENDING: 1,
  SUCCESS: 2,
  FAILURE: 3
};

export class ImmediateCanelPlanPage extends Component {
  state = {
    loading: LOAD_STATE.PENDING
  }

  componentDidMount() {
    return this.handlePlanCancellation();
  }

  redirectToBilling() {
    const { history } = this.props;
    history.push({
      pathname: BILLING_ROUTE
    });
  }

  handlePlanCancellation = () => {
    const { cancelAccount } = this.props;
    this.setState({ loading: LOAD_STATE.PENDING });
    return cancelAccount()
      .then(() => {
        this.setState({ loading: LOAD_STATE.SUCCESS });
      }, (error) => {
        this.setState({ loading: LOAD_STATE.FAILURE, error });
      });
  }

  renderSuccess() {
    return <div className={styles.MessageInnards}>
      <h1>Your account has been cancelled</h1>
      <PageLink to={BILLING_ROUTE}>Back to Billing</PageLink>
    </div>;
  }

  renderError() {
    return <div className={styles.ErrorBanner}>
      <ApiErrorBanner
        errorDetails={this.state.error.message}
        message='Sorry, we had some trouble cancelling your plan.'
        reload={this.handlePlanCancellation}
      />
    </div>;
  }

  render() {
    const { loading } = this.state;

    if (loading === LOAD_STATE.PENDING) {
      return <Loading />;
    }

    return <div className={styles.MessageBlock}>
      {loading === LOAD_STATE.FAILURE && this.renderError()}
      {loading === LOAD_STATE.SUCCESS && this.renderSuccess()}
    </div>;
  }
}

const mapDispatchToProps = {
  cancelAccount,
  showAlert
};

export default withRouter(connect(null, mapDispatchToProps)(ImmediateCanelPlanPage));

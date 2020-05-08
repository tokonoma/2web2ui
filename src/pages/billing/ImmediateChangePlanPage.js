import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import qs from 'query-string';
import * as conversions from 'src/helpers/conversionTracking';
import { updateSubscription } from 'src/actions/billing';
import { showAlert } from 'src/actions/globalAlert';
import { ApiErrorBanner, Loading } from 'src/components';
import { Heading } from 'src/components/text';
import { PageLink } from 'src/components/links';
import { stripImmediatePlanChange } from 'src/helpers/billing';
import { Page } from 'src/components/matchbox';
import styles from './ImmediateChangePlanPage.module.scss';

const BILLING_ROUTE = '/account/billing';

export const LOAD_STATE = {
  PENDING: 1,
  SUCCESS: 2,
  FAILURE: 3,
};

export class ImmediateChangePlanPage extends Component {
  state = {
    loading: LOAD_STATE.PENDING,
  };

  componentDidMount() {
    const { immediatePlanChange } = this.props;

    if (!immediatePlanChange) {
      this.redirectToBilling();
    } else {
      return this.handleImmediatePlanChange();
    }
  }

  redirectToBilling() {
    const { history, location } = this.props;
    history.push({
      pathname: BILLING_ROUTE,
      search: stripImmediatePlanChange(location.search),
    });
  }

  handleImmediatePlanChange = () => {
    const { immediatePlanChange: newCode, updateSubscription } = this.props;
    this.setState({ loading: LOAD_STATE.PENDING });
    return updateSubscription({ bundle: newCode }).then(
      () => {
        conversions.trackDowngradeToFree(newCode);
        this.setState({ loading: LOAD_STATE.SUCCESS });
      },
      error => {
        this.setState({ loading: LOAD_STATE.FAILURE, error });
      },
    );
  };

  renderSuccess() {
    return (
      <div>
        <Heading as="h2" looksLike="h5">
          Your subscription has been updated.
        </Heading>
      </div>
    );
  }

  renderError() {
    return (
      <div className={styles.ErrorBanner}>
        <ApiErrorBanner
          errorDetails={this.state.error.message}
          message="Sorry, we had some trouble updating your subscription."
          reload={this.handleImmediatePlanChange}
        />
      </div>
    );
  }

  render() {
    const { loading } = this.state;

    if (loading === LOAD_STATE.PENDING) {
      return <Loading />;
    }

    return (
      <Page
        title="Billing"
        breadcrumbAction={{
          content: 'Back to billing',
          to: BILLING_ROUTE,
          component: PageLink,
        }}
      >
        {loading === LOAD_STATE.SUCCESS && this.renderSuccess()}
        {loading === LOAD_STATE.FAILURE && this.renderError()}
      </Page>
    );
  }
}

const mapStateToProps = (state, props) => {
  const { immediatePlanChange } = qs.parse(props.location.search);
  return { immediatePlanChange };
};

const mapDispatchToProps = {
  updateSubscription,
  showAlert,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ImmediateChangePlanPage));

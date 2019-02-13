import React, { Component } from 'react';
import { Page } from '@sparkpost/matchbox';
import { Loading, ApiErrorBanner } from 'src/components';
import { Templates } from 'src/components/images';
import AlertCollection from './components/AlertCollection';
import withAlertsList from './containers/ListPage.container';

export class ListPage extends Component {
  state = {
    showDeleteModal: false,
    alertToDelete: {}
  }

  componentDidMount() {
    this.props.listAlerts();
  }

  toggleDelete = (id, subaccount_id) => {
    this.setState({
      showDeleteModal: !this.state.showDeleteModal,
      alertToDelete: { id, subaccountId: subaccount_id }
    });
  };

  handleDelete = () => {
    const { id, subaccountId } = this.state.alertToDelete;

    return this.props.deleteAlert({ id, subaccountId }).then(() => {
      this.props.showAlert({ type: 'success', message: 'Alert deleted' });
      this.toggleDelete();
    });
  }

  renderCollection() {
    return (
      <AlertCollection
        alerts={this.props.alerts}
        toggleDelete={this.toggleDelete}
      />
    );
  }

  renderError() {
    const { error, listAlerts } = this.props;
    return (
      <ApiErrorBanner
        message={'Sorry, we seem to have had some trouble loading your alerts.'}
        errorDetails={error.message}
        reload={listAlerts}
      />
    );
  }

  render() {
    const { alerts, error, loading } = this.props;

    if (loading) {
      return <Loading />;
    }

    return (
      <Page
        title='Alerts'
        primaryAction={{ content: 'Create an Alert', to: '/alerts-new/create' }}
        empty={{
          show: !error && alerts.length === 0,
          image: Templates,
          title: 'Create an Alert',
          content: <p>Manage notifications that alert you of performance problems.</p>
        }}
      >
        {error ? this.renderError() : this.renderCollection()}
        {/* TODO: add delete modal */}
      </Page>
    );
  }
}

export default withAlertsList(ListPage);

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Page } from '@sparkpost/matchbox';
import { ApiErrorBanner, DeleteModal, Loading } from 'src/components';
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

  toggleDelete = ({ id, name, subaccount_id } = {}) => {
    this.setState({
      showDeleteModal: !this.state.showDeleteModal,
      alertToDelete: { id, name, subaccountId: subaccount_id }
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
    const { alerts, deletePending, error, loading } = this.props;

    if (loading) {
      return <Loading />;
    }

    return (
      <Page
        title='Alerts'
        primaryAction={{ content: 'Create an Alert', to: '/alerts/create', component: Link }}
        empty={{
          show: !error && alerts.length === 0,
          image: Templates,
          title: 'Create an Alert',
          content: <p>Manage notifications that alert you of performance problems.</p>
        }}
      >
        {error ? this.renderError() : this.renderCollection()}
        <DeleteModal
          open={this.state.showDeleteModal}
          title='Are you sure you want to delete this alert?'
          content={<p>The alert "<strong>{this.state.alertToDelete.name}</strong>" will be permanently removed. This cannot be undone.</p>}
          onDelete={this.handleDelete}
          onCancel={this.toggleDelete}
          isPending={deletePending}
        />
      </Page>
    );
  }
}

export default withAlertsList(ListPage);

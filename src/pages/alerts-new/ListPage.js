import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Page } from '@sparkpost/matchbox';
import { Loading, ApiErrorBanner, DeleteModal, ConfirmationModal } from 'src/components';
import AlertCollection from './components/AlertCollection';
import withAlertsList from './containers/ListPageContainer';

class ListPage extends Component {
  state = {
    showCreateModal: false,
    showDeleteModal: false,
    alertToDelete: {}
  }

  componentDidMount() {
    this.props.listAlerts();
  }

  toggleCreate = () => {
    this.setState({ showCreateModal: !this.state.showCreateModal });
  };

  toggleDelete = (id, subaccount_id) => {
    this.setState({
      showDeleteModal: !this.state.showDeleteModal,
      alertToDelete: { id, subaccountId: subaccount_id }
    });
  };

  handleDelete = () => this.props.deleteAlert({ id, subaccountId }).then(() => {
    this.props.showAlert({ type: 'success', message: 'Alert deleted' });
    this.toggleDelete();
  })

  renderCollection() {
    const { alerts } = this.props;
    return (
      <AlertCollection
        alerts={alerts}
        toggleDelete={this.toggleDelete}
      />
    );
  }

  renderError() {
    const { error, listAlerts } = this.props;
    return (
      <ApiErrorBanner
        message={'Sorry, we seem to have had some trouble loading your A/B tests.'}
        errorDetails={error.message}
        reload={listAlerts}
      />
    );
  }

  render() {
    const { alerts, cancelPending, deletePending, error, loading } = this.props;

    if (loading) {
      return <Loading />;
    }

    return (
      <Page
        title='Alerts'
        primaryAction={{ content: 'Create an Alert', onClick: this.toggleCreate }}
      >
        {error ? this.renderError() : this.renderCollection()}
        {/* TODO: add delete modal */}
      </Page>
    );
  }
}

export default withAlertsList(ListPage);

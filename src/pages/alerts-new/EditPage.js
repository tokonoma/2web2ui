import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Page } from '@sparkpost/matchbox';
import withAlertsEdit from './containers/EditPage.container';
import AlertForm from './components/AlertForm';
import { Loading, DeleteModal, ApiErrorBanner } from 'src/components';

class EditPage extends Component {
  state = {
    showDeleteModal: false,
    alertToDelete: {}
  }

  componentDidMount() {
    this.props.getAlert({ id: this.props.match.params.id });
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

  /*
    Passed as onSubmit to AlertForm. Figures out what updates need to be passed
    to the updateAlert action.
  */
  update = async (values, alert) => {
    const { getAlert, updateAlert, showAlert, eventListing } = this.props;
    const { name, target, active, events = [], eventsRadio } = values;
    const { id, subaccount } = alert;
    const eventKeys = eventListing.map(({ key }) => key);

    await updateAlert({
      id,
      subaccount,
      name,
      target,
      active,
      events: (eventsRadio === 'all') ? eventKeys : eventKeys.filter((e) => events[e]) // if not "all", choose only keys whose value is "true"
    });

    showAlert({ type: 'success', message: 'Update Successful' });
    getAlert({ id, subaccount });
  }
  renderForm() {
    return (
      <AlertForm alert={this.props.alert} submitText = 'Update Alert' formName = 'EditAlertForm' newAlert = {false}
        toggleDelete={this.toggleDelete} onSubmit = {this.update}/>
    );
  }

  renderError() {
    const { error, getAlert } = this.props;
    return (
      <ApiErrorBanner
        message={'Sorry, we seem to have had some trouble loading your alerts.'}
        errorDetails={error.message}
        reload={getAlert}
      />
    );
  }

  render() {
    const { error, loading, deletePending } = this.props;
    //console.log(this.props);

    if (loading) {
      return <Loading />;
    }

    return (
      <Page title='Edit Alert' breadcrumbAction={{ content: 'Back to Alerts', to: '/alerts', component: Link }} >
        {error ? this.renderError() : this.renderForm()}
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

export default withAlertsEdit(EditPage);

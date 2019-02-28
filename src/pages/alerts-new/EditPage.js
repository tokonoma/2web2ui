import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Page } from '@sparkpost/matchbox';
import withAlertsEdit from './containers/EditPage.container';
import AlertForm from './components/AlertForm';
import { Loading, DeleteModal, ApiErrorBanner } from 'src/components';
import _ from 'lodash';

class EditPage extends Component {
  state = {
    showDeleteModal: false,
    alertToDelete: {}
  }

  componentDidMount() {
    this.props.getAlert({ id: this.props.match.params.id });
  }

  toggleDelete = () => {
    this.setState({
      showDeleteModal: !this.state.showDeleteModal
    });
  };

  handleDelete = () => this.props.deleteAlert({ id: this.props.alert.id }).then(() => {
    this.props.showAlert({ type: 'success', message: 'Alert deleted' });
    this.toggleDelete();
    this.props.history.push('/alerts-new');
  })

  /*
    Passed as onSubmit to AlertForm. Figures out what updates need to be passed
    to the updateAlert action.
  */
  update = async (values) => {
    const { getAlert, updateAlert, showAlert } = this.props;
    const {
      id,
      name,
      alert_metric,
      assignTo,
      alert_subaccount,
      email_addresses,
      facet_name,
      facet_value,
      criteria_comparator,
      criteria_value,
      enabled
    } = values;

    const addresses = _.split(email_addresses,',');
    const addr_array = _.map(addresses, (address) => address.trim());

    await updateAlert({
      id,
      data: {
        name,
        alert_metric,
        assignTo,
        alert_subaccount,
        email_addresses: addr_array,
        facet_name,
        facet_value,
        threshold: {
          error: {
            comparator: criteria_comparator,
            target: Number(criteria_value)
          }
        },
        enabled
      }
    });

    showAlert({ type: 'success', message: 'Update Successful' });
    getAlert({ id: this.props.match.params.id });
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
      <Page title='Edit Alert' breadcrumbAction={{ content: 'Back to Alerts', to: '/alerts', component: Link }} secondaryActions={[{ content: 'Delete Alert', onClick: this.toggleDelete }]}>
        {error ? this.renderError() : this.renderForm()}
        <DeleteModal
          open={this.state.showDeleteModal}
          title='Are you sure you want to delete this alert?'
          content={<p>The alert "<strong>{this.props.alert.name}</strong>" will be permanently removed. This cannot be undone.</p>}
          onDelete={this.handleDelete}
          onCancel={this.toggleDelete}
          isPending={deletePending}
        />
      </Page>
    );
  }
}

export default withAlertsEdit(EditPage);

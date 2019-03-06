import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Page } from '@sparkpost/matchbox';
import withAlertsCreate from './containers/CreatePage.container';
import AlertForm from './components/AlertForm';
import { Loading, DeleteModal, ApiErrorBanner } from 'src/components';
import _ from 'lodash';

export class CreatePage extends Component {
  state = {
    showDeleteModal: false
  }

  componentDidMount() {
  }

  toggleDelete = () => {
    this.setState({
      showDeleteModal: !this.state.showDeleteModal
    });
  };

  handleDelete = () => this.props.deleteAlert({ id: this.props.alert.id })
    .then(() => {
      this.props.showAlert({ type: 'success', message: 'Alert deleted' });
      this.toggleDelete();
      this.props.history.push('/alerts-new');
    })

  /*
    Passed as onSubmit to AlertForm. Figures out what updates need to be passed
    to the createAlert action.
  */
  handleCreate = async (values) => {
    const { email_addresses, alert_metric, threshold, assignTo, subaccount = '' } = values;
    const { createAlert, showAlert } = this.props;
    const splitAddresses = _.split(email_addresses,',');
    values.email_addresses = _.map(splitAddresses, (splitAddress) => _.trim(splitAddress));
    switch (assignTo) {
      case 'master':
        values.alert_subaccount = 0;
        break;
      case 'subaccount':
        values.alert_subaccount = parseInt(subaccount.id);
        break;
      case 'all':
      default:
        values.alert_subaccount = -1;
    }

    switch (alert_metric) {
      case 'monthly_sending_limit':
        threshold.error.target = parseInt(threshold.error.target);
        break;
      default:
        threshold.error.target = parseFloat(threshold.error.target);
    }

    await createAlert({
      data: _.omit(values, 'id', 'subaccount', 'assignTo')
    });
    //.then((response) => console.log('create response', response)); //get new id

    showAlert({ type: 'success', message: 'Create Successful' });
    //this.props.history.push(`/alerts-new/edit/${id}`);
  }

  renderForm() {
    return (
      <AlertForm newAlert = {true} onSubmit = {this.handleCreate}/>
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
      <Page
        title='Create Alert'
        breadcrumbAction={{ content: 'Back to Alerts', to: '/alerts', component: Link }}
        secondaryActions={[{ content: 'Delete Alert', onClick: this.toggleDelete }]}>
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

export default withAlertsCreate(CreatePage);

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Page } from '@sparkpost/matchbox';
import withAlertsCreate from './containers/CreatePage.container';
import AlertForm from './components/AlertForm';
import { Loading, ApiErrorBanner } from 'src/components';
import _ from 'lodash';
import formatActionData from './helpers/formatActionData';

export class CreatePage extends Component {
  state = {
    showDeleteModal: false
  }

  componentDidMount() {
  }

  componentDidUpdate() {
    const { error } = this.props;
    if (error) {
      this.props.history.push('/alerts-new');
      this.props.showAlert({ type: 'error', message: error.message });
    }
  }

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
    const { createAlert, showAlert } = this.props;
    const alertBody = formatActionData(values);

    await createAlert({
      data: _.omit(alertBody, 'id', 'subaccount', 'assignTo')
    }).then((response) => {
      showAlert({ type: 'success', message: 'Create Successful' });
      this.props.history.push(`/alerts-new/edit/${response.id}`);
    });
  }

  renderForm() {
    return (
      <AlertForm newAlert = {true} onSubmit = {this.handleCreate}/>
    );
  }

  renderError() {
    const { error } = this.props;
    return (
      <ApiErrorBanner
        message={'Sorry, we seem to have had some trouble loading the create alert page.'}
        errorDetails={error.message}
      />
    );
  }

  render() {
    const { error, loading } = this.props;

    if (loading) {
      return <Loading />;
    }

    return (
      <Page
        title='Create Alert'
        breadcrumbAction={{ content: 'Back to Alerts', to: '/alerts', component: Link }}>
        {error ? this.renderError() : this.renderForm()}
      </Page>
    );
  }
}

export default withAlertsCreate(CreatePage);

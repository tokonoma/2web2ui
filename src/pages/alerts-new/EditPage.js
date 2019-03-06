import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Page } from '@sparkpost/matchbox';
import withAlertsEdit from './containers/EditPage.container';
import AlertForm from './components/AlertForm';
import { Loading, DeleteModal, ApiErrorBanner } from 'src/components';
import _ from 'lodash';
import formatActionData from './helpers/formatActionData';

export class EditPage extends Component {
  state = {
    showDeleteModal: false
  }

  componentDidMount() {
    this.props.getAlert({ id: this.props.id });
  }

  componentDidUpdate() {
    const { error } = this.props;
    if (error) {
      this.props.history.push('/alerts-new');
      this.props.showAlert({ type: 'error', message: `Alert ${this.props.id} does not exist` });
    }
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
    to the updateAlert action.
  */
  handleUpdate = async (values) => {
    const { getAlert, updateAlert, showAlert } = this.props;
    const alertBody = formatActionData(values);

    await updateAlert({
      id: alertBody.id,
      data: _.omit(alertBody, 'id', 'subaccount', 'assignTo')
    });

    showAlert({ type: 'success', message: 'Alert updated' });
    getAlert({ id: this.props.match.params.id });
  }

  renderForm() {
    return (
      <AlertForm newAlert = {false} onSubmit = {this.handleUpdate}/>
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

    if (loading) {
      return <Loading />;
    }

    return (
      <Page
        title='Edit Alert'
        breadcrumbAction={{ content: 'Back to Alerts', to: '/alerts', component: Link }}
        secondaryActions={[{ content: 'Delete Alert', onClick: this.toggleDelete }]}>
        {error ? this.renderError() : this.renderForm()}
        <DeleteModal
          open={this.state.showDeleteModal}
          title='Are you sure you want to delete this alert?'
          content={<p>The alert will be permanently removed. This cannot be undone.</p>}
          onDelete={this.handleDelete}
          onCancel={this.toggleDelete}
          isPending={deletePending}
        />
      </Page>
    );
  }
}

export default withAlertsEdit(EditPage);

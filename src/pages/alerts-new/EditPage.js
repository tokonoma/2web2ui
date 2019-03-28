import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Page } from '@sparkpost/matchbox';
import withAlertsEdit from './containers/EditPage.container';
import AlertForm from './components/AlertForm';
import { Loading, DeleteModal } from 'src/components';
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
      this.props.showAlert({ type: 'error', message: 'Unable to load alert' });
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

    if ((alertBody.alert_metric === 'signals_health_dod') || ('signals_health_wow')) {
      const dropsValue = alertBody.threshold.error.target;
      const negDropsValue = (dropsValue > 0) ? dropsValue * (-1) : dropsValue;
      alertBody.threshold.error.target = negDropsValue;
    }

    await updateAlert({
      id: alertBody.id,
      data: _.omit(alertBody, 'id', 'subaccount', 'assignTo')
    });

    showAlert({ type: 'success', message: 'Alert updated' });
    getAlert({ id: this.props.match.params.id });
  }

  render() {
    const { loading, deletePending, alert } = this.props;

    if (loading) {
      return <Loading />;
    }

    return (
      <Page
        title={`Edit ${_.get(alert, 'name', 'Alert')}`}
        breadcrumbAction={{ content: 'Back to Alerts', to: '/alerts', component: Link }}
        secondaryActions={[{ content: 'Delete Alert', onClick: this.toggleDelete }]}>
        <AlertForm newAlert = {false} onSubmit = {this.handleUpdate}/>
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

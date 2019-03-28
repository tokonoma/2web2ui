import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Page } from '@sparkpost/matchbox';
import withAlertsCreate from './containers/CreatePage.container';
import AlertForm from './components/AlertForm';
import _ from 'lodash';
import formatActionData from './helpers/formatActionData';

export class CreatePage extends Component {

  /*
    Passed as onSubmit to AlertForm. Figures out what updates need to be passed
    to the createAlert action.
  */
  handleCreate = async (values) => {
    const { createAlert, showAlert } = this.props;
    const alertBody = formatActionData(values);

    if ((alertBody.alert_metric === 'signals_health_dod') || ('signals_health_wow')) {
      const dropsValue = alertBody.threshold.error.target;
      const negDropsValue = (dropsValue > 0) ? dropsValue * (-1) : dropsValue;
      alertBody.threshold.error.target = negDropsValue;
    }

    await createAlert({
      data: _.omit(alertBody, 'id', 'subaccount', 'assignTo')
    }).then((response) => {
      showAlert({ type: 'success', message: 'Alert created' });
      this.props.history.push(`/alerts-new/edit/${response.id}`);
    });
  }

  render() {
    return (
      <Page
        title='Create Alert'
        breadcrumbAction={{ content: 'Back to Alerts', to: '/alerts', component: Link }}>
        <AlertForm newAlert = {true} submitting={this.props.loading} onSubmit = {this.handleCreate}/>
      </Page>
    );
  }
}

export default withAlertsCreate(CreatePage);

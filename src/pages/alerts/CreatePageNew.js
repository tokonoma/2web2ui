import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Page } from '@sparkpost/matchbox';
import withAlertsCreate from './containers/CreatePageNew.container';
import AlertFormNew from './components/AlertFormNew';
import formatFormData from './helpers/formatFormData';

export class CreatePageNew extends Component {

  /*
    Passed as onSubmit to AlertForm. Figures out what updates need to be passed
    to the createAlert action.
  */
  handleCreate = (values) => {
    const { createAlert, showUIAlert, history } = this.props;
    return createAlert({
      data: formatFormData(values)
    }).then(() => {
      showUIAlert({ type: 'success', message: 'Alert created' });
      history.push('/alerts-new');
    });
  }

  render() {
    return (
      <Page
        title='Create Alert'
        breadcrumbAction={{ content: 'Back to Alerts', to: '/alerts-new', component: Link }}>
        <AlertFormNew submitting={this.props.loading} onSubmit={this.handleCreate}/>
      </Page>
    );
  }
}

export default withAlertsCreate(CreatePageNew);

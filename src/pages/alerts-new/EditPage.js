import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Page } from '@sparkpost/matchbox';
import withAlertsEdit from './containers/EditPageContainer';
import AlertForm from './components/AlertForm';

class EditPage extends Component {
  render() {
    return (
      <Page title='Edit Alert' breadcrumbAction={{ content: 'Back to Alerts', to: '/alerts', component: Link }} >
        <AlertForm />
      </Page>
    );
  }
}

export default withAlertsEdit(EditPage);

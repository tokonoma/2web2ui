import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Page } from '@sparkpost/matchbox';

class EditPage extends Component {
  render() {
    return (
      <Page title='Create an Alert' breadcrumbAction={{ content: 'Back to Alerts', to: '/alerts', component: Link }} >

      </Page>
    );
  }
}

export default EditPage;

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { create as createDomain } from 'src/actions/sendingDomains';
import { showAlert } from 'src/actions/globalAlert';
import { Page } from '@sparkpost/matchbox';
import { PageLink } from 'src/components/links';
import { Panel } from 'src/components/matchbox';

import CreateForm from './components/CreateForm';

export class CreatePage extends Component {
  handleCreate = values => {
    const { createDomain, history } = this.props;

    return createDomain(values).then(() =>
      history.push(`/account/sending-domains/edit/${values.domain}`),
    );
  };

  render() {
    return (
      <Page
        breadcrumbAction={{
          content: 'Back to Sending Domains',
          component: PageLink,
          to: '/account/sending-domains',
        }}
      >
        <Panel title="Add a Domain">
          <CreateForm onSubmit={this.handleCreate} />
        </Panel>
      </Page>
    );
  }
}

export default withRouter(connect(null, { createDomain, showAlert })(CreatePage));

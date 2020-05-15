import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { create as createDomain } from 'src/actions/sendingDomains';
import { showAlert } from 'src/actions/globalAlert';
import { PageLink } from 'src/components/links';
import { Page, Panel } from 'src/components/matchbox';
import { CAMPAIGN_IDS } from 'src/constants';
import { trackCustomConversionGoal } from 'src/helpers/vwo';
import CreateForm from './components/CreateForm';

export class CreatePage extends Component {
  handleCreate = values => {
    const { createDomain, history } = this.props;

    return createDomain(values).then(() => {
      history.push(`/account/sending-domains/edit/${values.domain}`);
      trackCustomConversionGoal(CAMPAIGN_IDS.CREATE_SENDINGDOMAIN);
    });
  };

  render() {
    return (
      <Page
        breadcrumbAction={{
          content: 'Back to Sending Domains',
          component: PageLink,
          to: '/account/sending-domains',
        }}
        title="Add a Domain"
      >
        <Panel>
          <CreateForm onSubmit={this.handleCreate} />
        </Panel>
      </Page>
    );
  }
}

export default withRouter(connect(null, { createDomain, showAlert })(CreatePage));

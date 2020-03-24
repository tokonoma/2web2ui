import React, { Component } from 'react';
import { Page } from '@sparkpost/matchbox';
import withAlertsCreate from './containers/CreatePage.container';
import AlertForm from './components/AlertForm';
import formatFormValues from './helpers/formatFormValues';
import { Loading } from 'src/components';
import { PageLink } from 'src/components/links';
import { RedirectAndAlert } from 'src/components/globalAlert';

export class CreatePage extends Component {
  componentDidMount() {
    const { getAlert, idToDuplicate } = this.props;
    if (idToDuplicate) {
      getAlert({ id: idToDuplicate });
    }
  }

  handleCreate = values => {
    const { createAlert, showUIAlert, history } = this.props;
    return createAlert({
      data: formatFormValues(values),
    }).then(({ id }) => {
      showUIAlert({ type: 'success', message: 'Alert created' });
      history.push(`/alerts/details/${id}`);
    });
  };

  render() {
    const { loading, getError, getLoading, idToDuplicate } = this.props;

    if (getLoading) {
      return <Loading />;
    }

    if (getError) {
      return <RedirectAndAlert to="/alerts" alert={{ type: 'error', message: getError.message }} />;
    }

    const backBreadcrumb = idToDuplicate
      ? { content: 'Back to Alert', to: `/alerts/details/${idToDuplicate}` }
      : { content: 'Back to Alerts', to: '/alerts' };
    return (
      <Page title="Create Alert" breadcrumbAction={{ ...backBreadcrumb, component: PageLink }}>
        <AlertForm
          submitting={loading}
          onSubmit={this.handleCreate}
          isDuplicate={Boolean(idToDuplicate)}
          isNewAlert={true}
        />
      </Page>
    );
  }
}

export default withAlertsCreate(CreatePage);

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Page } from '@sparkpost/matchbox';
import withAlertsCreate from './containers/CreatePage.container';
import AlertFormNew from './components/AlertFormNew';
import formatFormValues from './helpers/formatFormValues';
import { Loading } from 'src/components';
import { RedirectAndAlert } from 'src/components/globalAlert';

export class CreatePage extends Component {

  componentDidMount() {
    const { getAlert, idToDuplicate } = this.props;
    if (idToDuplicate) {
      getAlert({ id: idToDuplicate });
    }
  }

  handleCreate = (values) => {
    const { createAlert, showUIAlert, history } = this.props;
    return createAlert({
      data: formatFormValues(values)
    }).then(({ id }) => {
      showUIAlert({ type: 'success', message: 'Alert created' });
      history.push(`/alerts/details/${id}`);
    });
  };

  render() {
    const { loading, getError, getLoading, idToDuplicate } = this.props;

    if (getLoading) {
      return <Loading/>;
    }

    if (getError) {
      return (
        <RedirectAndAlert
          to='/alerts'
          alert={{ type: 'error', message: getError.message }}
        />
      );
    }

    const backBreadcrumb = idToDuplicate
      ? { content: 'Back to Alert', to: `/alerts/details/${idToDuplicate}` }
      : { content: 'Back to Alerts', to: '/alerts' };
    return (
      <Page
        title='Create Alert'
        breadcrumbAction={{ ...backBreadcrumb, component: Link }}>
        <AlertFormNew
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

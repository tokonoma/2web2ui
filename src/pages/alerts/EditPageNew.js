import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Page } from '@sparkpost/matchbox';
import withEditPage from './containers/EditPageNew.container';
import AlertFormNew from './components/AlertFormNew';
import { formatFromFormToApi, formatFromApiToForm } from './helpers/formatFormData';
import { Loading } from 'src/components';
import RedirectAndAlert from 'src/components/globalAlert/RedirectAndAlert';

export class EditPageNew extends Component {

  componentDidMount() {
    const { getAlert, id } = this.props;
    getAlert({ id });
  }

  handleUpdate = (values) => {
    const { updateAlert, showUIAlert, history, id } = this.props;
    return updateAlert({
      id,
      data: formatFromFormToApi(values)
    }).then(() => {
      showUIAlert({ type: 'success', message: 'Alert updated' });
      history.push('/alerts-new');
    });
  };

  render() {
    const { loading, getError, getLoading, alert } = this.props;

    if (getLoading) {
      return <Loading/>;
    }

    if (getError) {
      return (
        <RedirectAndAlert
          to='/alerts-new'
          alert={{ type: 'error', message: getError.message }}
        />
      );
    }
    const initialValues = formatFromApiToForm(alert);

    return (
      <Page
        title='Edit Alert'
        breadcrumbAction={{ content: 'Back to Alerts', to: '/alerts-new', component: Link }}>
        <AlertFormNew
          submitting={loading}
          onSubmit={this.handleUpdate}
          intialValues={initialValues}
          newAlert={false}
        />
      </Page>
    );
  }
}

export default withEditPage(EditPageNew);

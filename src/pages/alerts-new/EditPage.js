import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Page } from '@sparkpost/matchbox';
import withAlertsEdit from './containers/EditPageContainer';
import AlertForm from './components/AlertForm';
import ApiErrorBanner from 'src/components/apiErrorBanner/ApiErrorBanner';
import { Loading } from 'src/components';

class EditPage extends Component {

  componentDidMount() {
    this.props.getAlert();
  }

  /*
    Passed as onSubmit to AlertForm. Figures out what updates need to be passed
    to the updateAlert action.
  */
  update = async (values, alert) => {
    const { getAlert, updateAlert, showAlert, eventListing } = this.props;
    const { name, target, active, events = [], eventsRadio } = values;
    const { id, subaccount } = alert;
    const eventKeys = eventListing.map(({ key }) => key);

    await updateAlert({
      id,
      subaccount,
      name,
      target,
      active,
      events: (eventsRadio === 'all') ? eventKeys : eventKeys.filter((e) => events[e]) // if not "all", choose only keys whose value is "true"
    });

    showAlert({ type: 'success', message: 'Update Successful' });
    getAlert({ id, subaccount });
  }
  renderForm() {
    return (
      <AlertForm alert={this.props.alert} submitText = 'Update Alert' formName = 'EditAlertForm' newAlert = {false} onSubmit = {this.update}/>
    );
  }

  renderError() {
    const { error, getAlert } = this.props;
    return (
      <ApiErrorBanner
        message={'Sorry, we seem to have had some trouble loading your alerts.'}
        errorDetails={error.message}
        reload={getAlert}
      />
    );
  }

  render() {
    const { error, loading } = this.props;

    if (loading) {
      return <Loading />;
    }

    return (
      <Page title='Edit Alert' breadcrumbAction={{ content: 'Back to Alerts', to: '/alerts', component: Link }} >
        {error ? this.renderError() : this.renderForm()}
      </Page>
    );
  }
}

export default withAlertsEdit(EditPage);

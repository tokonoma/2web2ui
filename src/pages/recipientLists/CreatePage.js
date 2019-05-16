import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { change, getFormValues, reduxForm } from 'redux-form';

import { Page } from '@sparkpost/matchbox';

import { createRecipientList } from 'src/actions/recipientLists';
import { showAlert } from 'src/actions/globalAlert';

import RecipientListForm from './components/RecipientListForm';
import RecipientsCollection from './components/RecipientsCollection';
import parseRecipientListCsv from './helpers/csv';

const formName = 'recipientListForm';

export class CreatePage extends Component {
  state = {
    recipients: []
  };

  createRecipientList = ({ name, id, description }) => {
    const { createRecipientList, showAlert, history } = this.props;
    const data = {
      name,
      id,
      description,
      recipients: this.state.recipients
    };

    return createRecipientList(data)
      .then(() => {
        showAlert({
          type: 'success',
          message: 'Created recipient list'
        });
        history.push('/lists/recipient-lists');
      });
  };

  parseCsv = (csv) => {
    const { showAlert } = this.props;
    return parseRecipientListCsv(csv)
      .then((recipients) => {
        this.setState({ recipients });
      })
      .catch((csvErrors) => {
        showAlert({ type: 'error', message: 'Error while parsing CSV file' });
      });
  };

  componentDidUpdate(prevProps, prevState) {
    const { formValues } = this.props;
    if (prevProps.formValues && formValues.csv !== prevProps.formValues.csv) {
      this.parseCsv(formValues.csv);
    }
  }

  render() {
    const { handleSubmit } = this.props;
    const { recipients } = this.state;

    return <Page
      title='Create Recipient List'
      breadcrumbAction={{
        content: 'Recipient Lists',
        Component: Link,
        to: '/lists/recipient-lists'
      }}>

      <form onSubmit={handleSubmit(this.createRecipientList)}>
        <RecipientListForm formName={formName} onSubmit={this.createRecipientList}/>
        {!!recipients.length &&
        <RecipientsCollection recipients={recipients}/>
        }
      </form>
    </Page>;
  }
}

const mapStateToProps = (state, props) => ({
  initialValues: {},
  formValues: getFormValues(formName)(state)
});

const mapDispatchToProps = {
  createRecipientList,
  showAlert,
  change
};

const formOptions = {
  form: formName,
  enableReinitialize: true
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(reduxForm(formOptions)(CreatePage)));


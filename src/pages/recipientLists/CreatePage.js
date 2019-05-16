import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { formValueSelector, reduxForm } from 'redux-form';

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

  createRecipientsList = ({ name, id, description }) => {
    const { createRecipientList, showAlert, history } = this.props;
    const data = {
      name,
      id,
      description,
      recipients: this.state.recipients
    };

    return createRecipientList(data)
      .then((result) => {
        showAlert({
          type: 'success',
          message: 'Created recipient list'
        });
        history.push(`/lists/recipient-lists/edit/${result.id}`);
      });
  };

  parseCsv = (csv) => {
    const { showAlert } = this.props;
    return parseRecipientListCsv(csv)
      .then((recipients) => {
        this.setState({ recipients });
      })
      .catch((csvErrors) => {
        showAlert({ type: 'error', message: csvErrors });
      });
  };

  componentDidUpdate(prevProps, prevState) {
    const { csv } = this.props;
    if (csv && csv !== prevProps.csv) {
      this.parseCsv(csv);
    }
  }

  render() {
    const { handleSubmit, csv } = this.props;
    const { recipients } = this.state;

    return <Page
      title='Create Recipient List'
      breadcrumbAction={{
        content: 'Recipient Lists',
        Component: Link,
        to: '/lists/recipient-lists'
      }}>

      <form onSubmit={handleSubmit(this.createRecipientsList)}>
        <RecipientListForm formName={formName}/>
        <RecipientsCollection hasCsv={!!csv} recipients={recipients}/>
      </form>
    </Page>;
  }
}

const valueSelector = formValueSelector(formName);
const mapStateToProps = (state, props) => ({
  initialValues: {},
  csv: valueSelector(state, 'csv')
});

const mapDispatchToProps = {
  createRecipientList,
  showAlert
};

const formOptions = {
  form: formName,
  enableReinitialize: true
};

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm(formOptions)(CreatePage));


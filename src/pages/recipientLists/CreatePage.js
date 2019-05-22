import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { change, formValueSelector, reduxForm } from 'redux-form';

import { Page } from '@sparkpost/matchbox';

import { createRecipientList } from 'src/actions/recipientLists';
import { showAlert } from 'src/actions/globalAlert';

import RecipientListForm from './components/RecipientListForm';
import RecipientsCollection from './components/RecipientsCollection';
import parseRecipientListCsv from './helpers/csv';

const formName = 'recipientListForm';

export class CreatePage extends Component {

  createRecipientsList = ({ name, id, description }) => {
    const { createRecipientList, showAlert, history } = this.props;
    const data = {
      name,
      id,
      description,
      recipients: this.state.recipients
    };

    return createRecipientList(data)
      .then(({ id, total_rejected_recipients }) => {
        let message = 'Successfully created recipient list.';
        if (total_rejected_recipients) {
          message = `${message} ${total_rejected_recipients} ${total_rejected_recipients === 1 ? 'recipient was' : 'recipients were'} rejected!`;
        }
        showAlert({
          type: 'success',
          message
        });
        history.push(`/lists/recipient-lists/edit/${id}`);
      });
  };

  parseCsv = (csv) => {
    const { showAlert, change } = this.props;
    return parseRecipientListCsv(csv)
      .then((recipients) => {
        change('recipients', recipients);
      })
      .catch((csvErrors) => {
        change('recipients', []);
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
    const { handleSubmit, csv, recipients } = this.props;

    return <Page
      title='Create Recipient List'
      breadcrumbAction={{
        content: 'Recipient Lists',
        Component: Link,
        to: '/lists/recipient-lists'
      }}>

      <form onSubmit={handleSubmit(this.createRecipientsList)}>
        <RecipientListForm formName={formName}/>
        {csv && <RecipientsCollection recipients={recipients}/>}
      </form>
    </Page>;
  }
}

const valueSelector = formValueSelector(formName);
const mapStateToProps = (state, props) => ({
  recipients: valueSelector(state, 'recipients'),
  csv: valueSelector(state, 'csv')
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

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm(formOptions)(CreatePage));


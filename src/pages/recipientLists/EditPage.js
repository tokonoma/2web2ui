import React, { Component } from 'react';
import { connect } from 'react-redux';
import { change, formValueSelector, reduxForm } from 'redux-form';
import { Link, withRouter } from 'react-router-dom';
import _ from 'lodash';
import { Page } from '@sparkpost/matchbox';

import { deleteRecipientList, getRecipientList, updateRecipientList } from 'src/actions/recipientLists';

import { showAlert } from 'src/actions/globalAlert';
import { DeleteModal, Loading } from 'src/components';
import RecipientsCollection from './components/RecipientsCollection';
import RecipientListForm from './components/RecipientListForm';
import parseRecipientListCsv from './helpers/csv';

export class EditPage extends Component {
  state = {
    showDelete: false
  };

  toggleDelete = () => this.setState({ showDelete: !this.state.showDelete });

  secondaryActions = [
    {
      content: 'Delete',
      onClick: this.toggleDelete
    }
  ];

  deleteRecipientList = () => {
    const { current, deleteRecipientList, showAlert, history } = this.props;

    return deleteRecipientList(current.id).then(() => {
      showAlert({
        type: 'success',
        message: 'Deleted recipient list'
      });
      history.push('/lists/recipient-lists');
    });
  };

  updateRecipientList = (values) => {
    const { updateRecipientList, showAlert, history, recipients } = this.props;

    return updateRecipientList({ ...values, recipients })
      .then(({ total_rejected_recipients }) => {
        let message = 'Successfully Updated recipient list.';
        if (total_rejected_recipients) {
          message = `${message} ${total_rejected_recipients} ${total_rejected_recipients === 1 ? 'recipient was' : 'recipients were'} rejected!`;
        }

        showAlert({
          type: 'success',
          message: message
        });
        history.push('/lists/recipient-lists');
      });
  };

  parseCsv = (csv) => {
    const { showAlert, change } = this.props;
    return parseRecipientListCsv(csv)
      .then((recipients) => {
        change('recipients', recipients);
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

  componentDidMount() {
    const {
      match: { params: { id }},
      getRecipientList,
      history
    } = this.props;

    return getRecipientList(id).catch((err) => {
      history.push('/lists/recipient-lists');
    });
  }

  render() {
    const { loading, handleSubmit, current, recipients } = this.props;

    if (loading || !current) {
      return <Loading/>;
    }

    return <Page
      title='Update Recipient List'
      secondaryActions={this.secondaryActions}
      breadcrumbAction={{
        content: 'Recipient Lists',
        Component: Link,
        to: '/lists/recipient-lists'
      }}>

      <form onSubmit={handleSubmit(this.updateRecipientList)}>
        <RecipientListForm formName={formName} editMode={true}/>
        <RecipientsCollection recipients={recipients}
          isPreview={!_.isEqual(recipients, current.recipients)}
        />
      </form>


      <DeleteModal
        open={this.state.showDelete}
        title='Are you sure you want to delete this recipient list?'
        content={<p>The recipient list will be immediately and permanently removed. This cannot be undone.</p>}
        onCancel={this.toggleDelete}
        onDelete={this.deleteRecipientList}
      />
    </Page>;
  }
}

const formName = 'recipientListForm';
const valueSelector = formValueSelector(formName);
const mapStateToProps = (state) => ({
  current: state.recipientLists.current,
  loading: state.recipientLists.currentLoading,
  list: state.recipientLists.list,
  error: state.recipientLists.error,
  initialValues: state.recipientLists.current,
  csv: valueSelector(state, 'csv'),
  recipients: valueSelector(state, 'recipients')
});

const mapDispatchToProps = {
  getRecipientList,
  updateRecipientList,
  deleteRecipientList,
  showAlert,
  change
};

const formOptions = {
  form: formName
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(reduxForm(formOptions)(EditPage)));

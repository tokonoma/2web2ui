import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { Link, withRouter } from 'react-router-dom';

import { Page } from '@sparkpost/matchbox';

import {
  getRecipientList,
  updateRecipientList,
  deleteRecipientList
} from 'src/actions/recipientLists';

import { showAlert } from 'src/actions/globalAlert';
import { Loading, DeleteModal } from 'src/components';

import RecipientListForm from './components/RecipientListForm';

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
    const { updateRecipientList, showAlert, history } = this.props;

    return updateRecipientList(values).then(() => {
      showAlert({
        type: 'success',
        message: 'Updated recipient list'
      });
      history.push('/lists/recipient-lists');
    });
  };

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
    const { loading, handleSubmit } = this.props;

    if (loading) {
      return <Loading />;
    }

    return <Page
      title='Update Recipient List'
      secondaryActions={this.secondaryActions}
      breadcrumbAction={{
        content: 'Recipient Lists',
        Component: Link,
        to: '/lists/recipient-lists' }}>

      <form onSubmit={handleSubmit(this.updateRecipientList)}>
        <RecipientListForm formName={formName} editMode={true} />
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

const mapStateToProps = (state) => ({
  current: state.recipientLists.current,
  loading: state.recipientLists.currentLoading,
  list: state.recipientLists.list,
  error: state.recipientLists.error,
  initialValues: state.recipientLists.current
});

const mapDispatchToProps = {
  getRecipientList,
  updateRecipientList,
  deleteRecipientList,
  showAlert
};
const formName = 'recipientListForm';
const formOptions = {
  form: formName,
  enableReinitialize: true
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(reduxForm(formOptions)(EditPage)));

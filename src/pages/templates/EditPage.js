/* eslint-disable max-lines */
import React, { Component } from 'react';
import _ from 'lodash';
import { Grid, Page } from '@sparkpost/matchbox';
import { setSubaccountQuery } from 'src/helpers/subaccounts';
import ContentEditor from 'src/components/contentEditor';
import Loading from 'src/components/loading';
import { ActionsModal, DeleteModal } from 'src/components/modals';
import PageLink from 'src/components/pageLink';
import Form from './components/containers/Form.container';
import ImportSnippetLink from './components/ImportSnippetLink';

const CONTENT_FIELDS = {
  amp_html: 'AMP HTML Content',
  'from.email': 'From Email',
  'from.name': 'From Name',
  html: 'HTML Content',
  reply_to: 'Reply To',
  subject: 'Subject',
  text: 'Text Content'
};

const DEFAULT_DIRTY_CONTENT_MODAL_STATE = {
  callback: () => {}, // noop
  fields: [],
  isOpen: false
};

export default class EditPage extends Component {
  state = {
    deleteOpen: false,
    dirtyContentModal: DEFAULT_DIRTY_CONTENT_MODAL_STATE
  }

  componentDidMount() {
    const { match: { params: { id }}, getDraft, getTestData, subaccountId } = this.props;

    getDraft(id, subaccountId);
    getTestData({ id, mode: 'draft' });
  }

  componentDidUpdate() {
    const { getDraftError, history, showAlert } = this.props;

    if (getDraftError) {
      showAlert({ type: 'error', message: 'Unable to load template' });
      history.push('/templates');
    }
  }

  handlePublish = ({ published, ...values }) => {
    const { publish, match, showAlert, history, subaccountId } = this.props;

    return publish(values, subaccountId).then(() => {
      history.push(`/templates/edit/${match.params.id}/published${setSubaccountQuery(subaccountId)}`);
      showAlert({ type: 'success', message: 'Template published' });
    });
  }

  handleDelete = () => {
    const { deleteTemplate, match, showAlert, history, subaccountId } = this.props;

    return deleteTemplate(match.params.id, subaccountId).then(() => {
      history.push('/templates');
      showAlert({ message: 'Template deleted', type: 'success' });
    });
  }

  handleSave = ({ published, ...values }) => { // must omit published value
    const { showAlert, subaccountId, update } = this.props;

    return (
      update(values, subaccountId)
        .then(() => showAlert({ type: 'success', message: 'Template saved' }))
    );
  }

  checkForUnsavedChanges = (callback) => () => {
    const { formValues, template } = this.props;
    const fieldPaths = Object.keys(CONTENT_FIELDS);
    const dirtyFields = fieldPaths.filter((path) => (
      !_.isEqual(_.get(template.content, path), _.get(formValues.content, path))
    ));

    if (dirtyFields.length) {
      this.setState({ dirtyContentModal: { callback, fields: dirtyFields, isOpen: true }});
      return;
    }

    callback();
  };

  hideDirtyContentModal = () => {
    this.setState({ dirtyContentModal: DEFAULT_DIRTY_CONTENT_MODAL_STATE });
  }

  redirectToCreateDuplicate = () => {
    const { history, template } = this.props;
    history.push(`/templates/create/${template.id}`);
  }

  redirectToPublished = () => {
    const { history, subaccountId, template } = this.props;
    history.push(`/templates/edit/${template.id}/published${setSubaccountQuery(subaccountId)}`);
  }

  saveAndRedirect = (callback) => () => (
    this.handleSave(this.props.formValues).then(() => callback())
  )

  saveTestDataAndRedirectToPreview = () => {
    const { formValues, history, setTestData, subaccountId, template } = this.props;

    return (
      setTestData({ id: template.id, data: formValues.testData, mode: 'draft' }) // always save test data first
        .then(() => {
          history.push(`/templates/preview/${template.id}${setSubaccountQuery(subaccountId)}`);
        })
    );
  }

  handleDeleteModalToggle = () => {
    this.setState({ deleteOpen: !this.state.deleteOpen });
  }

  render() {
    const {
      canModify,
      canSend,
      formName,
      handleSubmit,
      loading,
      match: {
        params: {
          id
        }
      },
      subaccountId,
      submitting,
      template
    } = this.props;
    const { deleteOpen, dirtyContentModal } = this.state;

    if (loading) {
      return <Loading />;
    }

    return (
      <Page
        breadcrumbAction={{ content: 'Templates', component: PageLink, to: '/templates' }}
        primaryAction={(
          canModify
            ? { content: 'Publish Template', onClick: handleSubmit(this.handlePublish), disabled: submitting }
            : undefined
        )}
        secondaryActions={[
          {
            content: 'View Published',
            disabled: submitting,
            onClick: this.checkForUnsavedChanges(this.redirectToPublished),
            visible: template.has_published
          },
          {
            content: 'Save as Draft',
            disabled: submitting,
            onClick: handleSubmit(this.handleSave),
            visible: canModify
          },
          {
            content: 'Delete',
            disabled: submitting,
            onClick: this.handleDeleteModalToggle,
            visible: canModify
          },
          {
            content: 'Duplicate',
            disabled: submitting,
            onClick: this.checkForUnsavedChanges(this.redirectToCreateDuplicate),
            visible: canModify
          },
          {
            content: canSend ? 'Preview & Send' : 'Preview',
            disabled: submitting,
            onClick: this.checkForUnsavedChanges(this.saveTestDataAndRedirectToPreview),
            visible: true
          }
        ]}
        title={`${id} (Draft)`}
      >
        <Grid>
          <Grid.Column xs={12} lg={4}>
            <Form name={formName} subaccountId={subaccountId} readOnly={!canModify} />
          </Grid.Column>
          <Grid.Column xs={12} lg={8}>
            <ContentEditor readOnly={!canModify} action={canModify && <ImportSnippetLink />} />
          </Grid.Column>
        </Grid>
        <DeleteModal
          open={deleteOpen}
          title='Are you sure you want to delete this template?'
          content={<p>Both the draft and published versions of this template will be deleted.</p>}
          onCancel={this.handleDeleteModalToggle}
          onDelete={this.handleDelete}
        />
        <ActionsModal
          actions={[
            {
              content: 'Save as Draft and Continue',
              onClick: this.saveAndRedirect(dirtyContentModal.callback),
              primary: true
            },
            {
              content: 'Continue Without Saving',
              destructive: true,
              onClick: dirtyContentModal.callback
            }
          ]}
          content={
            <div>
              <p>
                Your changes to the following field(s) will be lost if you do not save them.  How
                would you like to proceed?
              </p>
              <ul>
                {dirtyContentModal.fields.map((field) => (
                  <li key={field}>{CONTENT_FIELDS[field]}</li>
                ))}
              </ul>
            </div>
          }
          isOpen={dirtyContentModal.isOpen}
          isPending={submitting}
          onCancel={this.hideDirtyContentModal}
          title="You have unsaved changes"
        />
      </Page>
    );
  }
}

import React from 'react';
import { connect } from 'react-redux';
import { showAlert } from 'src/actions/globalAlert';
import {
  getDraft,
  getPreview,
  getPublished,
  update as updateDraft,
  publish as publishDraft,
  deleteTemplate,
  create as createTemplate,
  sendPreview,
  setTestData as setTestDataAction, // A method to update the editor content is also called `setTestData` - this method updates
  getTestData
} from 'src/actions/templates';
import { getSnippets } from 'src/actions/snippets';
import { list as listDomains } from 'src/actions/sendingDomains';
import { list as listSubaccounts } from 'src/actions/subaccounts';
import {
  selectDraftTemplateById,
  selectDraftTemplatePreview,
  selectPreviewLineErrors,
  selectPublishedTemplateById,
  selectTemplateTestData
} from 'src/selectors/templates';
import { EditorContextProvider } from './context/EditorContext';
import EditAndPreviewPage from './EditAndPreviewPage';

const EditAndPreviewPageContainer = (props) => (
  <EditorContextProvider value={props}>
    <EditAndPreviewPage />
  </EditorContextProvider>
);

const mapStateToProps = (state, props) => {
  const id = props.match.params.id;
  const draft = selectDraftTemplateById(state, id);
  const published = selectPublishedTemplateById(state, id);
  const isPublishedMode = props.match.params.version === 'published';
  const template = draft || published;
  const hasDraft = template && template.has_draft;
  const hasPublished = template && template.has_published;
  const snippets = state.snippets.items;

  return {
    draft,
    published,
    template,
    snippets,
    isPublishedMode,
    hasDraft,
    hasPublished,
    hasDraftFailedToLoad: Boolean(state.templates.getDraftError),
    hasFailedToPreview: Boolean(state.templates.contentPreview.error),
    isDraftLoading: !draft || Boolean(state.templates.getDraftLoading),
    isDeletePending: state.templates.deletePending,
    isDraftUpdating: Boolean(state.templates.updating),
    isDraftPublishing: Boolean(state.templates.publishPending),
    areSnippetsLoading: Boolean(state.snippets.loading),
    isCreatePending: Boolean(state.templates.createPending),
    preview: selectDraftTemplatePreview(state, id, {}),
    previewLineErrors: selectPreviewLineErrors(state),
    templateTestData: selectTemplateTestData(state)
  };
};

const mapDispatchToProps = {
  getDraft,
  getPublished,
  getPreview,
  deleteTemplate,
  createTemplate,
  updateDraft,
  publishDraft,
  sendPreview,
  listDomains,
  listSubaccounts,
  showAlert,
  setTestDataAction,
  getTestData,
  getSnippets
};

export default connect(mapStateToProps, mapDispatchToProps)(EditAndPreviewPageContainer);

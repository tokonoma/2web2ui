import React from 'react';
import { connect } from 'react-redux';
import { showAlert } from 'src/actions/globalAlert';
import {
  getDraft,
  getPreview,
  getPublished,
  updateV2 as updateDraftV2,
  publishV2 as publishDraftV2,
  deleteTemplateV2,
  createV2 as createTemplateV2,
  sendPreviewV2,
  setTestDataV2,
  getTestDataV2
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
  const draftOrPublished = draft || published;
  const hasDraft = draftOrPublished && draftOrPublished.has_draft;
  const hasPublished = draftOrPublished && draftOrPublished.has_published;
  const snippets = state.snippets.items;

  return {
    draft,
    snippets,
    published,
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
  getPreview,
  getPublished,
  deleteTemplateV2,
  createTemplateV2,
  updateDraftV2,
  publishDraftV2,
  sendPreviewV2,
  listDomains,
  listSubaccounts,
  showAlert,
  setTestDataV2,
  getTestDataV2,
  getSnippets
};

export default connect(mapStateToProps, mapDispatchToProps)(EditAndPreviewPageContainer);

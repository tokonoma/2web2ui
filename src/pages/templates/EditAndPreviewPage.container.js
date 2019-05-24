import React from 'react';
import { connect } from 'react-redux';
import { getDraft, getPreview, getPublished, update } from 'src/actions/templates';
import {
  selectDraftTemplate,
  selectDraftTemplatePreview,
  selectPreviewLineErrors,
  selectPublishedTemplate
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
  const draft = selectDraftTemplate(state, id);
  const published = selectPublishedTemplate(state, id);

  return {
    draft,
    hasDraftFailedToLoad: Boolean(state.templates.getDraftError),
    hasFailedToPreview: Boolean(state.templates.contentPreview.error),
    isDraftLoading: !draft || Boolean(state.templates.getDraftLoading),
    isDraftUpdating: Boolean(state.templates.updating),
    preview: selectDraftTemplatePreview(state, id, {}),
    previewLineErrors: selectPreviewLineErrors(state),
    published
  };
};

const mapDispatchToProps = {
  getDraft,
  getPreview,
  getPublished,
  updateDraft: update
};

export default connect(mapStateToProps, mapDispatchToProps)(EditAndPreviewPageContainer);

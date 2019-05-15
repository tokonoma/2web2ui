import React from 'react';
import { connect } from 'react-redux';
import { getDraft, getPublished } from 'src/actions/templates';
import { selectDraftTemplate, selectPublishedTemplate } from 'src/selectors/templates';
import { EditorContextProvider } from '../context/EditorContext';
import EditAndPreviewPage from '../EditAndPreviewPage';

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
    isDraftLoading: !draft || Boolean(state.templates.getDraftLoading),
    published
  };
};

const mapDispatchToProps = {
  getDraft,
  getPublished
};

export default connect(mapStateToProps, mapDispatchToProps)(EditAndPreviewPageContainer);

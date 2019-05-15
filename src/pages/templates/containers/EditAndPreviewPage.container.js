import React from 'react';
import { connect } from 'react-redux';
import { EditorContextProvider } from '../context/EditorContext';
import EditAndPreviewPage from '../EditAndPreviewPage';

const EditAndPreviewPageContainer = (props) => (
  <EditorContextProvider value={props}>
    <EditAndPreviewPage />
  </EditorContextProvider>
);

const mapStateToProps = () => ({});
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(EditAndPreviewPageContainer);

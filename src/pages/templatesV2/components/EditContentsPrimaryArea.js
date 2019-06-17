import React from 'react';
import useEditorContext from '../hooks/useEditorContext';
import DraftModeActions from './editorActions/DraftModeActions';
import PublishedModActions from './editorActions/PublishedModeActions';

const EditContentsPrimaryArea = () => {
  const { isPublishedMode } = useEditorContext();

  return isPublishedMode ? <PublishedModActions /> : <DraftModeActions />;

};

export default EditContentsPrimaryArea;

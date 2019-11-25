import React from 'react';
import useEditorContext from '../hooks/useEditorContext';
import DraftModeActions from './editorActions/DraftModeActions';
import PublishedModeActions from './editorActions/PublishedModeActions';

const EditContentsPrimaryArea = () => {
  const { isPublishedMode } = useEditorContext();

  return isPublishedMode ? <PublishedModeActions /> : <DraftModeActions />;

};

export default EditContentsPrimaryArea;

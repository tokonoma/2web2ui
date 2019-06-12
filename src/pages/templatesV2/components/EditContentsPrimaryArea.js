import { useMemo } from 'react';
import useEditorContext from '../hooks/useEditorContext';
import draftModeActions from './editorActions/DraftModeActions';
import publishedModeActions from './editorActions/PublishedModeActions';

const EditContentsPrimaryArea = () => {
  const { isPublishedMode, draft } = useEditorContext();
  const publishedActions = useMemo(publishedModeActions, [isPublishedMode, draft]);
  const draftActions = useMemo(draftModeActions, [isPublishedMode, draft]);

  return isPublishedMode ? publishedActions : draftActions;

};

export default EditContentsPrimaryArea;

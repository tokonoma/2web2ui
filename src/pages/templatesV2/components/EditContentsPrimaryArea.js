import { useMemo } from 'react';
import useEditorContext from '../hooks/useEditorContext';
import draftModeActions from './editorActions/DraftModeActions';
import publishedModeActions from './editorActions/PublishedModeActions';

const EditContentsPrimaryArea = () => {
  const { isPublishedMode, draft } = useEditorContext();
  const publishedActions = useMemo(publishedModeActions, [isPublishedMode, draft.id]);
  const draftActions = useMemo(draftModeActions, [isPublishedMode, draft.id]);

  return isPublishedMode ? publishedActions : draftActions;

};

export default EditContentsPrimaryArea;

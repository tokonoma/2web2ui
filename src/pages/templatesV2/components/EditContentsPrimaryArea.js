import useEditorContext from '../hooks/useEditorContext';
import draftModeActions from './actions/DraftModeActions';
import publishedModeActions from './actions/PublishedModeActions';

const EditContentsPrimaryArea = () => {
  const { isPublishedMode } = useEditorContext();

  return isPublishedMode ? publishedModeActions() : draftModeActions();

};

export default EditContentsPrimaryArea;

import { useEffect, useState } from 'react';

// the store for in progress content changes
const useEditorContent = ({ draft = {}, published = {}, isPublishedMode }) => {
  const [state, setState] = useState({});
  const setContent = (nextState) => {
    if (isPublishedMode) {
      return; //do not allow updating published content
    }
    setState({ ...state, ...nextState }); // merge-in
  };

  // hydrate when loaded
  useEffect(() => {
    const activeContent = isPublishedMode ? published : draft;
    if (activeContent.content) {
      setState(activeContent.content);
    }
  }, [draft, isPublishedMode, published]);

  return {
    content: state,
    setContent
  };
};

export default useEditorContent;

import { useEffect, useState } from 'react';

// the store for in progress content changes
const useEditorContent = ({ draft = {}}) => {
  const [state, setState] = useState({});
  const setContent = (nextState) => {
    setState({ ...state, ...nextState }); // merge-in
  };

  // hydrate when loaded
  useEffect(() => {
    if (draft.content) {
      setState(draft.content);
    }
  }, [draft.content]);

  return {
    content: state,
    setContent
  };
};

export default useEditorContent;

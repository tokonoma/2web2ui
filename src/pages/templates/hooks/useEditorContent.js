import { useEffect, useState } from 'react';

// the store for in progress content changes
const useEditorContent = ({ draft = {}}) => {
  const [state, setState] = useState({});
  const setContent = (nextState) => {
    setState({ ...state, ...nextState }); // merge-in
  };

  // hydrate when draft is loaded (has a last_update_time value) and updated (last_update_time changes)
  useEffect(() => {
    if (draft.last_update_time) {
      setState(draft.content);
    }
  }, [draft.content, draft.last_update_time]);

  return {
    content: state,
    setContent
  };
};

export default useEditorContent;

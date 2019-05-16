import React, { createContext } from 'react';
import useEditorContent from '../hooks/useEditorContent';

const EditorContext = createContext();

export const EditorContextProvider = ({ children, value }) => {
  const contentState = useEditorContent(value.draft);

  return (
    <EditorContext.Provider value={{ ...value, ...contentState }}>
      {children}
    </EditorContext.Provider>
  );
};

export default EditorContext;

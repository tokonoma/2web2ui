import React, { createContext } from 'react';

const EditorContext = createContext();

export const EditorContextProvider = ({ children, value }) => (
  <EditorContext.Provider value={value}>
    {children}
  </EditorContext.Provider>
);

export default EditorContext;

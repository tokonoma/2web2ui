import React, { createContext, useEffect } from 'react';
import useRouter from 'src/hooks/useRouter';
import useEditorContent from '../hooks/useEditorContent';

const EditorContext = createContext();

export const EditorContextProvider = ({ children, value }) => {
  const contentState = useEditorContent(value.draft);
  const { requestParams } = useRouter();

  useEffect(() => {
    value.getDraft(requestParams.id, requestParams.subaccount);
    value.getPublished(requestParams.id, requestParams.subaccount);
  }, [requestParams.id, requestParams.subaccount, value]);

  return (
    <EditorContext.Provider value={{ ...value, ...contentState }}>
      {children}
    </EditorContext.Provider>
  );
};

export default EditorContext;

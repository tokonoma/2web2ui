import React, { createContext, useEffect } from 'react';
import useRouter from 'src/hooks/useRouter';
import useEditorContent from '../hooks/useEditorContent';

const EditorContext = createContext();

export const EditorContextProvider = ({
  children,
  value: { getDraft, getPublished, ...value }
}) => {
  const contentState = useEditorContent(value.draft);
  const { requestParams } = useRouter();

  useEffect(() => {
    getDraft(requestParams.id, requestParams.subaccount);
    getPublished(requestParams.id, requestParams.subaccount);
  }, [getDraft, getPublished, requestParams.id, requestParams.subaccount]);

  return (
    <EditorContext.Provider value={{ ...value, ...contentState }}>
      {children}
    </EditorContext.Provider>
  );
};

export default EditorContext;

import React, { createContext, useEffect } from 'react';
import useRouter from 'src/hooks/useRouter';
import useEditorContent from '../hooks/useEditorContent';
import useEditorTabs from '../hooks/useEditorTabs';

const EditorContext = createContext();

export const EditorContextProvider = ({
  children,
  value: { getDraft, getPublished, ...value }
}) => {
  const contentState = useEditorContent(value.draft);
  const tabState = useEditorTabs();
  const { requestParams } = useRouter();

  useEffect(() => {
    getDraft(requestParams.id, requestParams.subaccount);
    getPublished(requestParams.id, requestParams.subaccount);
  }, [getDraft, getPublished, requestParams.id, requestParams.subaccount]);

  return (
    <EditorContext.Provider
      value={{ ...value, ...contentState, ...tabState }}
    >
      {children}
    </EditorContext.Provider>
  );
};

export default EditorContext;

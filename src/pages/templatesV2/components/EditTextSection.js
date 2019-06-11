import React from 'react';
import useEditorContext from '../hooks/useEditorContext';
import Editor from './Editor';

const EditTextSection = () => {
  const { content, setContent, isPublishedMode } = useEditorContext();

  return (
    <Editor
      name="text-content-editor"
      onChange={(value) => { setContent({ text: value }); }}
      value={content.text}
      readOnly={isPublishedMode}
    />
  );
};

export default EditTextSection;

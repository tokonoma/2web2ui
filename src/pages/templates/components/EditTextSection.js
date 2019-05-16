import React from 'react';
import useEditorContext from '../hooks/useEditorContext';
import Editor from './Editor';

const EditTextSection = () => {
  const { content, setContent } = useEditorContext();

  return (
    <Editor
      name="text-content-editor"
      onChange={(value) => { setContent({ text: value }); }}
      value={content.text}
    />
  );
};

export default EditTextSection;

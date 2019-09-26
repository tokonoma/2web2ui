import React from 'react';
import useEditorContext from '../hooks/useEditorContext';
import Editor from './Editor';
import 'brace/mode/html';

const EditHtmlSection = () => {
  const { content, setContent, isPublishedMode } = useEditorContext();

  return (
    <Editor
      mode="html"
      name="html-content-editor"
      onChange={(value) => { setContent({ html: value }); }}
      value={content.html}
      readOnly={isPublishedMode}
    />
  );
};

export default EditHtmlSection;

import React from 'react';
import useEditorContext from '../hooks/useEditorContext';
import Editor from './Editor';
import 'brace/mode/html';

const EditAmpSection = () => {
  const { annotations, content, setContent, isPublishedMode } = useEditorContext();

  return (
    <Editor
      inlineErrors={annotations.amp_html}
      mode="html"
      name="amp-html-content-editor"
      onChange={(value) => { setContent({ amp_html: value }); }}
      value={content.amp_html}
      readOnly={isPublishedMode}
    />
  );
};

export default EditAmpSection;

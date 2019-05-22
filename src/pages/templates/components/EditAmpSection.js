import React from 'react';
import useEditorContext from '../hooks/useEditorContext';
import Editor from './Editor';
import 'brace/mode/html';

const EditAmpSection = () => {
  const { content, setContent } = useEditorContext();

  return (
    <Editor
      mode="html"
      name="amp-html-content-editor"
      onChange={(value) => { setContent({ amp_html: value }); }}
      value={content.amp_html}
    />
  );
};

export default EditAmpSection;

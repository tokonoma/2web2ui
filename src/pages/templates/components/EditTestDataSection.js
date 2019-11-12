import React from 'react';
import 'brace/mode/json';
import useEditorContext from '../hooks/useEditorContext';
import Editor from './Editor';

const EditTestDataSection = () => {
  const {
    setTestData,
    testData
  } = useEditorContext();

  return (
    <Editor
      mode="json"
      name="test-data-editor"
      onChange={(value) => setTestData(value)}
      value={testData}
    />
  );
};

export default EditTestDataSection;

import React from 'react';
import useEditorContext from '../hooks/useEditorContext';
import Editor from './Editor';

const TestDataSection = () => {
  const { setTestData, testData } = useEditorContext();

  return (
    <Editor
      mode="json"
      name="test-data-editor"
      onChange={(value) => { setTestData(value); }}
      value={testData}
    />
  );
};

export default TestDataSection;

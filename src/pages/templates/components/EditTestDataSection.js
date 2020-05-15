import React, { useEffect } from 'react';
import 'brace/mode/json';
import useEditorContext from '../hooks/useEditorContext';
import Editor from './Editor';

const EditTestDataSection = () => {
  const {
    setTestData, // This updates the UI
    setTestDataAction, // This updates localStorage
    testData,
    parsedTestData,
    isPublishedMode,
    template,
  } = useEditorContext();
  const { id } = template;
  const mode = isPublishedMode ? 'published' : 'draft';

  // As test data updates, update local storage
  useEffect(() => {
    setTestDataAction({
      id,
      mode,
      data: parsedTestData,
    });
  }, [setTestDataAction, parsedTestData, id, mode]);

  return (
    <Editor
      mode="json"
      name="test-data-editor"
      onChange={value => setTestData(value)}
      value={testData}
    />
  );
};

export default EditTestDataSection;

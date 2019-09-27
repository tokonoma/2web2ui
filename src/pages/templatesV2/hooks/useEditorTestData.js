import { useState, useEffect } from 'react';

const useEditorTestData = (props) => {
  const {
    draft,
    templateTestData,
    getTestData,
    isPublishedMode
  } = props;
  const [testData, setTestData] = useState(templateTestData);

  // Update the data store with data stored in `localStorage`
  useEffect(() => {
    getTestData({
      id: draft && draft.id,
      mode: isPublishedMode ? 'published' : 'draft'
    });
  }, [getTestData, draft, isPublishedMode]);

  const getFormattedTestData = () => {
    try {
      return JSON.parse(testData);
    } catch (err) {
      return {};
    }
  };

  // useEffect(() => {
  //   setTestData(templateTestData);
  // }, [templateTestData]);

  return {
    formattedTestData: getFormattedTestData(),
    testData,
    setTestData
  };
};

export default useEditorTestData;

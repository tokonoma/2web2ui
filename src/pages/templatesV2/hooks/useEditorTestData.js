import { useState, useEffect } from 'react';

const useEditorTestData = (props) => {
  const {
    draft,
    templateTestData,
    getTestData,
    isPublishedMode
  } = props;
  const [testData, setTestData] = useState(templateTestData);

  const getParsedTestData = () => {
    try {
      return JSON.parse(testData);
    } catch (err) {
      return {};
    }
  };

  // Update the data store with data stored in `localStorage`
  useEffect(() => {
    getTestData({
      id: draft && draft.id,
      mode: isPublishedMode ? 'published' : 'draft'
    }).then((res) => setTestData(JSON.stringify(res.payload, null, 1)));
  }, [getTestData, draft, isPublishedMode]);

  return {
    getParsedTestData,
    testData,
    setTestData
  };
};

export default useEditorTestData;

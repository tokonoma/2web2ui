import { useState, useEffect } from 'react';

const useEditorTestData = (props) => {
  const {
    draft,
    templateTestData,
    getTestDataV2,
    isPublishedMode
  } = props;
  const [testData, setTestData] = useState(templateTestData);
  const [parsedTestData, setParsedTestData] = useState(undefined);

  useEffect(() => {
    if (draft) {
      const baseTestData = {
        substitution_data: {},
        metadata: {},
        options: {}
      };

      // Merge the base data structure with actual data
      // to ensure that if no data is available, at least the test
      // data base is available as guidance.
      setTestData(JSON.stringify({
        ...baseTestData,
        ...getTestDataV2({
          id: draft.id,
          mode: isPublishedMode ? 'published' : 'draft'
        })
      }, null, 2));
    }
  }, [draft, getTestDataV2, isPublishedMode]);

  useEffect(() => {
    try {
      setParsedTestData(JSON.parse(testData));
    } catch {
      setParsedTestData({});
    }
  }, [testData, setParsedTestData]);

  return {
    testData,
    setTestData,
    parsedTestData
  };
};

export default useEditorTestData;

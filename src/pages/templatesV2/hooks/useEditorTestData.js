import { useState, useEffect } from 'react';

const useEditorTestData = (props) => {
  const { draft, templateTestData, getTestDataV2 } = props;
  const [testData, setTestData] = useState(templateTestData);
  const [parsedTestData, setParsedTestData] = useState(undefined);

  useEffect(() => {
    if (draft) {
      const retrievedTestData = getTestDataV2({ id: draft.id });
      const baseTestData = {
        substitution_data: {},
        metadata: {},
        options: {}
      };

      setTestData(JSON.stringify({ ...baseTestData, ...retrievedTestData }, null, 2));
    }
  }, [getTestDataV2, draft]);

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

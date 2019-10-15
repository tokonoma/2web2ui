import { useState, useEffect } from 'react';

const useEditorTestData = (props) => {
  const { draft, templateTestData, getTestDataV2 } = props;
  const [testData, setTestData] = useState(templateTestData);

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

  return {
    testData,
    setTestData
  };
};

export default useEditorTestData;

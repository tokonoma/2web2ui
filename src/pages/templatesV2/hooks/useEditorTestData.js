import { useState, useEffect } from 'react';

const useEditorTestData = (props) => {
  const {
    draft,
    templateTestData,
    getSnippet
  } = props;
  const [testData, setTestData] = useState(templateTestData);

  useEffect(() => {
    if (draft) {
      // Grab the recipient list to get the test data from the server,
      // and update the UI with said data once retrieved.
      getSnippet({ id: draft.id })
        .then((res) => {
          // When no values are available, a base data structure is assumed
          const baseTestData = {
            substitution_data: {},
            metadata: {},
            options: {}
          };
          const retrievedTestData = JSON.parse(res.content.html);

          setTestData(JSON.stringify({ ...baseTestData, ...retrievedTestData }, null, 1));
        });
    }
  }, [getSnippet, draft]);

  return {
    testData,
    setTestData
  };
};

export default useEditorTestData;

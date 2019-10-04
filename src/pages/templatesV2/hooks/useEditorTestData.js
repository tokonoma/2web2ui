import { useState, useEffect } from 'react';

const useEditorTestData = (props) => {
  const {
    draft,
    templateTestData,
    getRecipientList
  } = props;
  const [testData, setTestData] = useState(templateTestData);

  const getParsedTestData = (data) => {
    try {
      return JSON.parse(data);
    } catch (err) {
      return {};
    }
  };

  useEffect(() => {
    if (draft) {
      // Grab the recipient list to get the test data from the server,
      // and update the UI with said data once retrieved.
      getRecipientList(draft && draft.id, { show_recipients: true })
        .then((res) => {
          // When no values are available, a base data structure is assumed
          const baseTestData = {
            substitution_data: {},
            metadata: {},
            options: {}
          };
          const retrievedTestData = {
            substitution_data: res.recipients[0].substitution_data,
            metadata: res.recipients[0].metadata,
            options: draft.options
          };

          setTestData(JSON.stringify({ ...baseTestData, ...retrievedTestData }, null, 1));
        });
    }
  }, [getRecipientList, draft]);

  return {
    getParsedTestData,
    testData,
    setTestData
  };
};

export default useEditorTestData;

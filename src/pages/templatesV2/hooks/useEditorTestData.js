import { useState, useEffect } from 'react';

const useEditorTestData = (props) => {
  const {
    draft,
    templateTestData,
    getRecipientList
  } = props;
  const [testData, setTestData] = useState(templateTestData);

  const getParsedTestData = () => {
    try {
      return JSON.parse(testData);
    } catch (err) {
      return {};
    }
  };

  useEffect(() => {
    getRecipientList(draft && draft.id, { show_recipients: true })
      .then((res) => {
        const baseTestData = {
          substitution_data: {},
          metadata: {},
          options: {}
        };
        const retrievedTestData = {
          substitution_data: res.recipients[0].substitution_data,
          metadata: res.recipients[0].metadata
        };

        setTestData(JSON.stringify({ ...baseTestData, ...retrievedTestData }, null, 1));
      });
  }, [getRecipientList, draft]);

  return {
    getParsedTestData,
    testData,
    setTestData
  };
};

export default useEditorTestData;

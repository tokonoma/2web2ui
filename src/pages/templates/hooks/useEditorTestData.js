import { useState, useEffect } from 'react';
import _ from 'lodash';

const useEditorTestData = (props) => {
  const {
    draft,
    templateTestData,
    getTestData,
    isPublishedMode
  } = props;
  const [testData, setTestData] = useState(templateTestData);
  const [parsedTestData, setParsedTestData] = useState({});

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
        ...getTestData({
          id: draft.id,
          mode: isPublishedMode ? 'published' : 'draft'
        })
      }, null, 2));
    }
  }, [draft, getTestData, isPublishedMode]);

  useEffect(() => {
    let results;

    try {
      results = JSON.parse(testData);
    } catch (err) {
      // See: https://2ality.com/2017/08/optional-catch-binding.html#use-case%3A-json.parse()
      if (err instanceof SyntaxError) {
        results = {};
      } else {
        throw err;
      }
    }
    const nextParsedTestData = _.pick(results, ['metadata', 'options', 'substitution_data']);

    setParsedTestData(nextParsedTestData);
  }, [testData, setParsedTestData]);

  return {
    testData,
    setTestData,
    parsedTestData
  };
};

export default useEditorTestData;
